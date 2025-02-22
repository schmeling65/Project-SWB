import { Schema, model } from "mongoose";

/**
 * Schema für die User Kollektion
 */
const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "id field is getting set at first login"],
      unique: true,
    },
    keycloakStringID: {
      type: String,
      required: [true, "stringid field is getting set after register and checked on every login"],
      unique: true,
    },
    name: {
      type: String,
      required: [false, "name field is required"],
    },
    profilepicture: {
      type: Number,
      required: [false, "profilepicture field is required"],
    },
    age: {
      type: Number,
      required: [false, "age field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("user", userSchema);
