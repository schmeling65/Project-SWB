import { Schema, model } from "mongoose";

/**
 * Schema für die UserChat Kollektion
 */
const userChatSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id field is required"],
      unique: true,
    },
    chatId: {
      type: Number,
      required: [true, "chatId field is required"],
    },
    userId: {
      type: Number,
      required: [true, "userId field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("userchat", userChatSchema);
