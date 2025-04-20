import React from "react";

const users = ["John", "Alice", "Bob", "Eve"];

export default function ChatList({ onSelectUser }) {
  return (
    <div className="divide-y">
      {users.map((user, idx) => (
        <div
          key={idx}
          className="p-4 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
          onClick={() => onSelectUser(user)}
        >
          <span>{user}</span>
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
        </div>
      ))}
    </div>
  );
}
