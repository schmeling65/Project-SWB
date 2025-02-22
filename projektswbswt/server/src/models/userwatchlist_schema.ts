import { Schema, model } from "mongoose";

/**
 * Schema für die UserWatchlist Kollektion
 */
const userWatchlistSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id field is required"],
      unique: true,
    },
    userId: {
      type: Number,
      required: [true, "userId field is required"],
    },
    offerId: {
      type: Number,
      requird: [true, "offerId field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("userwatchlist", userWatchlistSchema);
