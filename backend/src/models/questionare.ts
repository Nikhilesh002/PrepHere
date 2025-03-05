import mongoose, { Schema } from "mongoose";

export interface IQuestionare {
  userId: Schema.Types.ObjectId;
  slug: string;
  difficulty: string;
  category: string;
  country: string;
  ctc: string;
  companyName: string;
  yoe: string;
  role: string;
  challenges: string;
  planId: Schema.Types.ObjectId;
  noOfWeeks: number;
  noOfHoursPerWeek: number;
  cnt: number;
}

export interface IQuestionareDoc extends IQuestionare, mongoose.Document {}

const questionareSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    noOfWeeks: { type: Number, required: true },
    noOfHoursPerWeek: { type: Number, required: true },
    cnt: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

questionareSchema.index({ userId: 1, planId: 1 });

export const questionareModel = mongoose.model(
  "Questionare",
  questionareSchema
);
