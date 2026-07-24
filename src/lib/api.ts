import axios from "axios"
import { retrieveRawInitData } from "@tma.js/sdk"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
})

// Every request carries Telegram's raw initData string. The FastAPI backend
// verifies its signature (using the bot token) to authenticate the user —
// this is the standard, secure way to auth a Telegram Mini App: never trust
// a user id sent as a plain field, always verify the signed initData.
api.interceptors.request.use((config) => {
  try {
    const initData = retrieveRawInitData()
    if (initData) {
      config.headers["Authorization"] = `tma ${initData}`
    }
  } catch {
    // Not running inside Telegram (e.g. local browser dev) — send
    // unauthenticated; backend should reject or use a dev bypass.
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[API] ${error.response.status} ${error.config?.url}`, error.response.data)
    } else {
      console.error("[API] Network error", error.message)
    }
    return Promise.reject(error)
  }
)
