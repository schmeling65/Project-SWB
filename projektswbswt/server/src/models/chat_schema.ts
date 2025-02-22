import { Schema, model } from "mongoose";

/**
 * Schema für die Chat Kollektion
 */
const chatSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id field is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model("chat", chatSchema);
