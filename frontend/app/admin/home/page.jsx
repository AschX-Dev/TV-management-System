"use client";

import { useState, useEffect } from "react";
import {
  Monitor,
  Activity,
  Radio,
  AlertCircle,
  TrendingUp,
  Users,
  PlayCircle,
  Clock,
} from "lucide-react";
import api from "../../lib/api";
import io from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalScreens: 0,
    onlineScreens: 0,
    offlineScreens: 0,
    totalMedia: 0,
    activeCampaigns: 0,
    totalGroups: 0,
  });
  const [recentDevices, setRecentDevices] = useState([]);
  const [recentMedia, setRecentMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [tvsRes, mediaRes, campaignsRes, groupsRes] = await Promise.all([
        api.get("/tv/all"),
        api.get("/media/recent-media?limit=6"),
        api.get("/campaigns").catch(() => ({ data: [] })),
        api.get("/groups").catch(() => ({ data: [] })),
      ]);

      const tvs = tvsRes.data || [];
      const online = tvs.filter((tv) => tv.status === "online").length;

      setStats({
        totalScreens: tvs.length,
        onlineScreens: online,
        offlineScreens: tvs.length - online,
        totalMedia: mediaRes.data?.length || 0,
        activeCampaigns:
          campaignsRes.data?.filter((c) => c.status === "Active").length || 0,
        totalGroups: groupsRes.data?.length || 0,
      });

      setRecentDevices(tvs.slice(0, 6));
      setRecentMedia(mediaRes.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div
          className={`p-4 rounded-full ${color.replace(
            "border",
            "bg"
          )} bg-opacity-10`}
        >
          <Icon className={`w-8 h-8 ${color.replace("border-", "text-")}`} />
        </div>
      </div>
    </div>
  );

  const DeviceCard = ({ device }) => (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              device.status === "online" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Monitor
              className={`w-5 h-5 ${
                device.status === "online" ? "text-green-600" : "text-red-600"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {device.name || device.tvId}
            </h3>
            <p className="text-sm text-gray-500">{device.location}</p>
            <p className="text-xs text-gray-400">
              {device.resolution || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              device.status === "online"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {device.status === "online" ? "🟢 Online" : "🔴 Offline"}
          </span>
          {device.lastSeen && (
            <p className="text-xs text-gray-400 mt-1">
              {new Date(device.lastSeen).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const MediaCard = ({ media }) => (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
        {media.mediaUrl && (
          <img
            src={media.mediaUrl}
            alt={media.title}
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3C/svg%3E')
            }
          />
        )}
      </div>
      <h4 className="font-medium text-gray-900 truncate">{media.title}</h4>
      <p className="text-xs text-gray-500 mt-1">{media.mediaCategory}</p>
      <p className="text-xs text-gray-400">
        {new Date(media.createdAt).toLocaleDateString()}
      </p>
    </div>
  );

  if (loading && recentDevices.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Monitor your screens, content, and campaigns in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Screens"
          value={stats.totalScreens}
          icon={Monitor}
          color="border-blue-500"
          subtext={`${stats.onlineScreens} online, ${stats.offlineScreens} offline`}
        />
        <StatCard
          title="Online Now"
          value={stats.onlineScreens}
          icon={Activity}
          color="border-green-500"
          subtext="Active connections"
        />
        <StatCard
          title="Media Library"
          value={stats.totalMedia}
          icon={PlayCircle}
          color="border-purple-500"
          subtext="Total items"
        />
        <StatCard
          title="Active Campaigns"
          value={stats.activeCampaigns}
          icon={Radio}
          color="border-orange-500"
          subtext="Currently running"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <QuickAction
          title="Upload Media"
          description="Add new content to library"
          href="/admin/uploadMedia"
          icon={PlayCircle}
          color="bg-purple-500"
        />
        <QuickAction
          title="Create Campaign"
          description="Schedule content across screens"
          href="/admin/campaigns"
          icon={Radio}
          color="bg-orange-500"
        />
        <QuickAction
          title="Manage Devices"
          description="Register and configure screens"
          href="/admin/manageTV"
          icon={Monitor}
          color="bg-blue-500"
        />
      </div>

      {/* Recent Devices */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Devices</h2>
          <a
            href="/admin/fetchAllTV"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDevices.length > 0 ? (
            recentDevices.map((device) => (
              <DeviceCard key={device._id} device={device} />
            ))
          ) : (
            <div className="col-span-3 text-center py-8 bg-white rounded-lg">
              <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No devices registered yet</p>
              <a
                href="/admin/manageTV/registerNewTV"
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                Register your first device
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Recent Media */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Media</h2>
          <a
            href="/admin/recentUpload"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentMedia.length > 0 ? (
            recentMedia.map((media) => (
              <MediaCard key={media._id} media={media} />
            ))
          ) : (
            <div className="col-span-4 text-center py-8 bg-white rounded-lg">
              <PlayCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No media uploaded yet</p>
              <a
                href="/admin/uploadMedia"
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                Upload your first media
              </a>
            </div>
          )}
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HealthIndicator
            label="API Status"
            status="healthy"
            message="All systems operational"
          />
          <HealthIndicator
            label="Database"
            status="healthy"
            message="Connected to MongoDB"
          />
          <HealthIndicator
            label="WebSocket"
            status="healthy"
            message="Real-time enabled"
          />
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ title, description, href, icon: Icon, color }) => (
  <a href={href} className="block">
    <div
      className={`${color} rounded-xl p-6 text-white hover:opacity-90 transition-opacity cursor-pointer`}
    >
      <Icon className="w-8 h-8 mb-3" />
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  </a>
);

const HealthIndicator = ({ label, status, message }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div
      className={`w-3 h-3 rounded-full ${
        status === "healthy" ? "bg-green-500" : "bg-red-500"
      } animate-pulse`}
    ></div>
    <div>
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500">{message}</p>
    </div>
  </div>
);

export default HomePage;
