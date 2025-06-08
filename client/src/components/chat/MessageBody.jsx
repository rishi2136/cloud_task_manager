import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../utils/socketIO";
import { GrClearOption } from "react-icons/gr";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const MessageBody = () => {
  // const [msgQueue, setMsgQueue] = useState([
  //   {
  //     name: "Raju",
  //     message: "Hello wolrd",
  //   },
  //   {
  //     name: "ajay",
  //     message: "Hello wolrd",
  //   },
  //   {
  //     name: "allu",
  //     message: "Hello wolrd",
  //   },
  // ]);

  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const { user: currUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const currUser = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const requestHistory = () => {
      socket.emit("get_chat_history");
    };

    socket.on("connect", requestHistory); // For first connection and reconnections
    requestHistory(); // Immediate request

    socket.on("chat_history", (history) => {
      setMessages(history || []); // defensive
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("error_message", (err) => {
      toast.error(err.message); // Or show toast/snackbar
    });

    return () => {
      socket.off("connect", requestHistory);
      socket.off("chat_history");
      socket.off("receive_message");
    };
  }, [socket]);

  const clearMessage = () => {
    console.log("clicked");
    socket.emit("clear_history", true);
  };

  function ChatHeader() {
    return (
      <div className="p-4 border-b mb-1 flex justify-between align-baseline sticky top">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        {currUser?.isAdmin && (
          <GrClearOption
            className="mt-2 "
            title="clear chat"
            onClick={clearMessage}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-white  overflow-hidden flex flex-col border border-gray-200">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No messages yet.</p>
        ) : (
          messages.map(({ content, sender }, idx) => {
            const isCurrentUser = currUser.name === sender.name;

            return (
              <div
                key={idx}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${
                    isCurrentUser
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    className={`text-xs mb-1 font-medium ${
                      isCurrentUser ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {isCurrentUser
                      ? `You [${sender.title}]`
                      : `${sender.name} [${sender.title}]`}
                  </div>
                  <div className="text-sm break-words">{content}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div ref={lastMessageRef} />
    </div>
  );
};

export default MessageBody;
