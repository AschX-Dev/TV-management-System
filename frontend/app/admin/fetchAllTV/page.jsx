"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";

export default function RegisteredTVs() {
  const [tvs, setTVs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVs = async () => {
      try {
        const response = await api.get("/tv/all");
        setTVs(response.data || []);
      } catch (error) {
        console.error("Error fetching TVs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTVs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TVs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Registered TVs ({tvs.length})
      </h1>
      {tvs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">No TVs registered yet.</p>
          <a
            href="/admin/manageTV/registerNewTV"
            className="text-blue-600 hover:underline"
          >
            Register your first TV →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tvs.map((tv) => (
            <div
              key={tv._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center font-bold text-lg bg-blue-600 text-white py-3 flex items-center justify-between px-4">
                <span>{tv.name || tv.tvId}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    tv.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {tv.status === "online" ? "🟢 Online" : "⚫ Offline"}
                </span>
              </div>
              <div className="p-4 text-gray-800 space-y-2">
                <p>
                  <span className="font-semibold">ID:</span> {tv.tvId}
                </p>
                <p>
                  <span className="font-semibold">Model:</span> {tv.tvModel}
                </p>
                <p>
                  <span className="font-semibold">Size:</span> {tv.tvSize}{" "}
                  inches
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {tv.location}
                </p>
                {tv.resolution && (
                  <p>
                    <span className="font-semibold">Resolution:</span>{" "}
                    {tv.resolution}
                  </p>
                )}
                {tv.lastSeen && (
                  <p className="text-xs text-gray-500">
                    Last seen: {new Date(tv.lastSeen).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
