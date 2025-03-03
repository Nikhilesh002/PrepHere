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
      ref: "User",
    },
    questionareId: {
      type: Schema.Types.ObjectId,
      ref: "Questionare",
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

planSchema.index({ userId: 1, questionareId: 1 });

export const planModel = mongoose.model("Plan", planSchema);
