import mongoose from "mongoose";

const questionareSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      refs: "user",
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    country: { type: String, required: true },
    ctc: { type: String, required: true },
    companyName: { type: String, required: true },
    yoe: { type: String, required: true },
    role: { type: String, required: true },
    challenges: { type: String, required: true },
    plan: {
      type: mongoose.Types.ObjectId,
      refs: "plan",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const questionareModel = mongoose.model(
  "questionare",
  questionareSchema
);
