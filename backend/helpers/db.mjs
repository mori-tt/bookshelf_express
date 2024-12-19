import mongoose from "mongoose";
import env from "dotenv";
env.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
