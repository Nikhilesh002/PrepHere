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
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    planIds: [
      {
        type: Schema.Types.ObjectId,
        refs: "plan",
        required: true,
        unique: true,
      },
    ],
    questionareIds: [
      {
        type: Schema.Types.ObjectId,
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
