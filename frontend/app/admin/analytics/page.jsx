"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Monitor,
  PlayCircle,
  Clock,
  Download,
} from "lucide-react";
import api from "../../lib/api";

const AnalyticsPage = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalPlays: 0,
    totalScreens: 0,
    avgUptime: 0,
    topMedia: [],
  });
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const { data: playbackLogs } = await api.get("/logs/playback");
      setLogs(playbackLogs || []);

      // Calculate stats
      const completed = playbackLogs.filter(
        (log) => log.status === "completed"
      );
      const uniqueScreens = new Set(playbackLogs.map((log) => log.tvId));

      setStats({
        totalPlays: completed.length,
        totalScreens: uniqueScreens.size,
        avgUptime: 98.5, // TODO: Calculate from actual data
        topMedia: [],
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, unit = "" }) => (
    <div
      className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow"
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {value}
            {unit}
          </p>
        </div>
        <Icon className="w-10 h-10" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics & Reports
          </h1>
          <p className="text-gray-600 mt-1">
            Track performance, impressions, and system health
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Date Range:
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Plays"
          value={stats.totalPlays}
          icon={PlayCircle}
          color="#8b5cf6"
        />
        <StatCard
          title="Active Screens"
          value={stats.totalScreens}
          icon={Monitor}
          color="#3b82f6"
        />
        <StatCard
          title="Avg Uptime"
          value={stats.avgUptime}
          icon={TrendingUp}
          color="#10b981"
          unit="%"
        />
        <StatCard
          title="Impressions"
          value={stats.totalPlays * 50}
          icon={BarChart3}
          color="#f59e0b"
        />
      </div>

      {/* Playback Logs Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Playback Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  TV ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Media
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Started
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.slice(0, 10).map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {log.tvId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {log.mediaId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(log.startedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : log.status === "error"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No playback logs yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;






