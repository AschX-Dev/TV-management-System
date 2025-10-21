"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

export default function RegisterTV() {
  const [formData, setFormData] = useState({
    tvId: "",
    name: "",
    tvModel: "",
    tvSize: "",
    location: "",
    channelID: "announcement",
    resolution: "1920x1080",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/tv/register-tv", formData);

      toast.success("TV registered successfully!");
      setFormData({
        tvId: "",
        name: "",
        tvModel: "",
        tvSize: "",
        location: "",
        channelID: "announcement",
        resolution: "1920x1080",
      });
      router.push("/admin/fetchAllTV");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register TV!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center pb-16 rounded-lg bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register New TV</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="tvId"
            value={formData.tvId}
            onChange={handleChange}
            placeholder="TV ID (e.g., TV001)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Display Name (e.g., Main Lobby)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white placeholder-gray-500"
          />
          <input
            type="text"
            name="tvModel"
            value={formData.tvModel}
            onChange={handleChange}
            placeholder="TV Model (e.g., Samsung 55 inch)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="tvSize"
            value={formData.tvSize}
            onChange={handleChange}
            placeholder="TV Size (e.g., 55)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location (e.g., Building A - Lobby)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            placeholder="Resolution (e.g., 1920x1080)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              "Register TV"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
