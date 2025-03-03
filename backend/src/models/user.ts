import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  plans: mongoose.Types.ObjectId[];
  questionares: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    plans: [
      {
        type: mongoose.Types.ObjectId,
        refs: "plan",
        required: true,
        unique: true,
      },
    ],
    questionares: [
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
