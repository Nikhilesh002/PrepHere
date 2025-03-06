import mongoose from "mongoose";
import { configs } from ".";

export const connectDb = async () => {
  try {
    await mongoose.connect(configs.mongodbUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Adjust pool size
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
};
