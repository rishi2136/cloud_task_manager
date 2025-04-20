import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
const MessageContent = mongoose.model("Message", messageSchema);

export default MessageContent;
