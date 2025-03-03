import mongoose, { Schema } from "mongoose";

export interface IPlan {
  userId: Schema.Types.ObjectId;
  questionareId: Schema.Types.ObjectId;
  slug: string;
  idxs: number[];
  roadmap: string;
}

export interface IPlanDoc extends IPlan, mongoose.Document {}

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      refs: "user",
      required: true,
    },
    questionareId: {
      type: Schema.Types.ObjectId,
      refs: "questionare",
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    idxs: { type: [Number], required: true },
    roadmap: { type: String, required: true },
    // TODO add req fields
  },
  {
    timestamps: true,
  }
);

export const planModel = mongoose.model("plan", planSchema);
