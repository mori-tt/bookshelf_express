import mongoose from "mongoose";
import env from "dotenv";
env.config();

// 警告を解決するための設定
mongoose.set("strictQuery", true);

try {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected successfully");
} catch (err) {
  console.error("MongoDB connection error:", err);
}
