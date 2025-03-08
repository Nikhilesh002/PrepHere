import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email: string;
  planIds: Schema.Types.ObjectId[];
  questionareIds: Schema.Types.ObjectId[];
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    planIds: {
      type: [Schema.Types.ObjectId],
      ref: "Plan",
      default: [],
    },
    questionareIds: {
      type: [Schema.Types.ObjectId],
      ref: "Questionare",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("User", userSchema);
