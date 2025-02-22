import { Schema, model } from "mongoose";

/**
 * Schema für die Image Kollektion
 */
const imageSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id field is required"],
      unique: true,
    },
    offerId: {
      type: Number,
      required: false,
    },
    width: {
      type: Number,
      required: [true, "width field is required"],
    },
    height: {
      type: Number,
      required: [true, "height field is required"],
    },
    image: {
      type: Buffer,
      contentType: String,
      required: [true, "image field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("image", imageSchema);
