import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
