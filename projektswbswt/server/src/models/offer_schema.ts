import { Schema, model } from "mongoose";

/*
 * Schema für Offer Kollektion
 */
const offerSchema = new Schema(
  {
    id: {
      type: Number,
      required: [false, "id field is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [false, "name field is required"],
    },
    text: {
      type: String,
      required: [false, "text field is required"],
    },
    userid: {
      type: Number,
      required: [false, "userid field is required"],
    },
    offertype: {
      type: Number,
      required: [false, "offertype field is required"],
    },
    price: {
      type: Number,
      required: [false, "offertype field is required"],
    },
    location: {
      type: String,
      required: [false, "offertype field is required"],
    },
    filename: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = model("offer", offerSchema);
