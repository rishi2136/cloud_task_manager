// sockets/socketHandler.js
import Message from "../models/message.js";

function socketHandler(io) {
  io.on("connection", async (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("get_chat_history", async () => {
      // 🔁 Send chat history when client connects
      const messages = await Message.find()
        .sort({ date: 1 })
        .limit(100)
        .populate("sender", "name title")
        .lean();
      socket.emit("chat_history", messages);
    });

    // 📩  When message is sent
    socket.on("send_message", async (data) => {
      const { content, sender } = data;
      if (!content || !sender) {
        socket.emit("error_message", {
          message: "User credentials missing. Please log in again.",
        });
        return; // Stop further execution
      }

      const newMessage = new Message(data);
      await newMessage.save();
      const addedMessage = await Message.findById(newMessage._id)
        .populate("sender", "name title")
        .lean();

      console.log("Yeah save it", newMessage);

      // Broadcast to everyone including sender
      io.emit("receive_message", addedMessage);
    });

    socket.on("clear_history", async (data) => {
      console.log("I am triggered");
      const res = await Message.deleteMany({});
      console.log(res);
      const allMsg = await Message.find({});
      console.log(allMsg);
      io.emit("chat_history", allMsg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

export default socketHandler;
