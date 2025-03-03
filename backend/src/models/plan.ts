import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      refs: "user",
      required: true,
      unique: true,
    },
    questionare: {
      type: mongoose.Types.ObjectId,
      refs: "questionare",
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    // TODO add req fields
  },
  {
    timestamps: true,
  }
);

export const planModel = mongoose.model("plan", planSchema);
