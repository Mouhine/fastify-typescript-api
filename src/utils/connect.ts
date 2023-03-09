import mongoose from "mongoose";
import config from "config";
import log from "./Logger";
async function connectDB() {
  const dbURI = config.get<string>("dbURI");
  try {
    await mongoose.connect(dbURI);
    log.info("connected to db");
  } catch (error) {
    log.error("could not connect to db");
    process.exit(1);
  }
}

export default connectDB;
