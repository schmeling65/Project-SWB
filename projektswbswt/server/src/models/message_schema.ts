import { Schema, model } from "mongoose";

/**
 * Schema für die Kollektion message
 */
const messageSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id field is required"],
      unique: true,
    },
    messageText: {
      type: String,
      required: [true, "messageText field is required"],
    },
    chatId: {
      type: Number,
      required: [true, "chatId field is required"],
    },
    authorUserId: {
      type: Number,
      required: [true, "authorUserId field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("message", messageSchema);
