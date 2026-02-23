import "dotenv/config";
import mongoose from "mongoose";
import http from "http";
import app from "./app.js";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    // connect to mongoDB
    connectDB();
    // connect to cloudinary
    connectCloudinary();
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

startServer();
