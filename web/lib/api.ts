import axios from "axios";

/**
 * Axios instance configured for cross-site cookies.
 */
export const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

/**
 * Helper for SSR requests using fetch.
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
    ...options,
    credentials: "include", // required for HttpOnly cookies
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}
