import React, { useState } from "react";
import { socket } from "../../utils/socketIO";
import { toast } from "sonner";

export default function MsgInput() {
  const [msg, setMsg] = useState("");

  //set message to the backend
  const handleSend = (e) => {
    e.preventDefault();
    if (msg.trim() && localStorage.getItem("userInfo")) {
      const { _id } = JSON.parse(localStorage.getItem("userInfo"));
      if (!_id) {
        toast.error("User not identified");
        return;
      }
      socket.emit("send_message", {
        content: msg,
        sender: _id,
        socketID: socket.id,
      });
    }
    setMsg("");
  };

  return (
    <div className="p-3 border-t bg-white sticky bottom-0 right-0 z-10 w-full">
      <form onSubmit={handleSend} className="flex items-center gap-2 ">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Send
        </button>
      </form>
    </div>
  );
}
