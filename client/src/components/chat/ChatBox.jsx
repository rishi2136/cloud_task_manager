import React from "react";
import MessageBody from "./MessageBody";
import MsgInput from "./MsgInput";
import ChatList from "./ChatList";

const ChatBox = ({ isHidden }) => {
  return (
    <div
      className={`h-[90vh] w-80 bg-white fixed z-[5] m-0 overflow-auto top-16 transition-all duration-700 ease-in-out ${
        isHidden ? "-end-96" : "end-0"
      } border border-black  z-10 text-black `}
    >
      {/* <ChatList /> */}
      <MessageBody />
      <MsgInput />
    </div>
  );
};

export default ChatBox;
