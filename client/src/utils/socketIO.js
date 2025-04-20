import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL; // Your backend URL
export const socket = io(URL, {
  transports: ["websocket"],
  withCredentials: true,
});
