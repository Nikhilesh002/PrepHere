import mongoose, { Document } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email: string;
  planIds: mongoose.Types.ObjectId[];
  questionareIds: mongoose.Types.ObjectId[];
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    planIds: [
      {
        type: mongoose.Types.ObjectId,
        refs: "plan",
        required: true,
        unique: true,
      },
    ],
    questionareIds: [
      {
        type: mongoose.Types.ObjectId,
        refs: "questionare",
        required: true,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
