import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");

    await mongoose.connection.db.dropCollection("comments");
    console.log("Collection dropped");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

connectDB();
