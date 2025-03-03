import mongoose from "mongoose";

export interface IPlan {
  userId: mongoose.Types.ObjectId;
  questionareId: mongoose.Types.ObjectId;
  slug: string;
  idxs: number[];
}

export interface IPlanDoc extends IPlan, mongoose.Document {}

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      refs: "user",
      required: true,
      unique: true,
    },
    questionareId: {
      type: mongoose.Types.ObjectId,
      refs: "questionare",
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    idxs: { type: [Number], required: true },
    // TODO add req fields
  },
  {
    timestamps: true,
  }
);

export const planModel = mongoose.model("plan", planSchema);
