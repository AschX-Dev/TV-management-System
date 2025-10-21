"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/lib/api";
import { Loader } from "lucide-react";
import io from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3002";

export default function TVScreen() {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const router = useRouter();
  const params = useParams();
  const tvId = params.ID;

  useEffect(() => {
    if (!tvId) {
      router.push("/display");
      return;
    }

    // Fetch initial media
    const fetchMedia = async () => {
      try {
        const { data } = await api.get(`/tv/display/${tvId}`);
        if (data?.mediaUrl) {
          setMediaUrl(data.mediaUrl);
          setMediaType(getMediaType(data.mediaUrl));
        }
      } catch (err) {
        console.error("Error fetching media:", err);
      }
    };

    fetchMedia();

    // Initialize Socket.IO
    const newSocket = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to server");
      setConnected(true);
      newSocket.emit("joinRoom", tvId);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setConnected(false);
    });

    newSocket.on("mediaUpdate", (newMedia) => {
      console.log("📺 New media received:", newMedia);
      if (newMedia?.mediaUrl) {
        setMediaUrl(newMedia.mediaUrl);
        setMediaType(getMediaType(newMedia.mediaUrl));
      }
    });

    newSocket.on("deviceCommand", (data) => {
      console.log("🎮 Command received:", data.command);
      // Handle commands (pause, resume, reboot)
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [tvId, router]);

  const getMediaType = (url) => {
    if (url?.endsWith(".mp4")) return "video";
    if (url?.match(/\.(gif|jpe?g|png)$/i)) return "image";
    return null;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">⚠️ Error</p>
          <p className="text-lg text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Connection Status Indicator */}
      <div className="absolute top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-sm">
        <div
          className={`w-3 h-3 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          } animate-pulse`}
        ></div>
        <span className="text-sm">
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* TV ID Info */}
      <div className="absolute bottom-4 left-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
        <p className="text-xs">
          TV ID: <span className="font-bold">{tvId}</span>
        </p>
        {mediaUrl && <p className="text-xs mt-1">Status: Playing</p>}
      </div>

      {/* Media Display */}
      <div className="flex items-center justify-center w-full h-full">
        {!mediaUrl ? (
          <div className="text-center text-white">
            <Loader className="w-16 h-16 animate-spin mx-auto mb-4" />
            <p className="text-lg">Waiting for content...</p>
            <p className="text-sm text-gray-400 mt-2">TV ID: {tvId}</p>
          </div>
        ) : mediaType === "video" ? (
          <video
            key={mediaUrl}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt="Media"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
