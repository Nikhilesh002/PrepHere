import mongoose from "mongoose";
import { configs } from ".";

export const connectDb = async () => {
  try {
    await mongoose.connect(configs.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 20,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
};
