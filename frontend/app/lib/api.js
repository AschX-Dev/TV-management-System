import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token from localStorage to headers
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("📤 Sending request with token to:", config.url);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "🔴 API Error:",
      error.response?.status,
      error.response?.config?.url
    );
    if (error.response?.status === 401) {
      // Don't redirect if it's the login endpoint itself
      const url = error.response?.config?.url || "";
      if (!url.includes("/login") && !url.includes("/validate")) {
        console.log("❌ 401 Unauthorized - Redirecting to login");
        // Clear invalid token
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_URL };
