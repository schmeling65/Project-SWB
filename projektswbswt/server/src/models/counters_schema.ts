import { Schema, model } from "mongoose";

/**
 * Schema für die Counter Kollektion
 */
const counterSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "id field is required"],
      unique: true,
    },
    sequence_value:{
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = model("counters", counterSchema);
