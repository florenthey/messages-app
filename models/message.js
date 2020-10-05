import mongoose from "mongoose";
import user from "./user";

const { String, ObjectId, Boolean } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
