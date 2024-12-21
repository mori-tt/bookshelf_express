import express from "express";
import cors from "cors";
import apiRoutes from "./api-routes/index.mjs";
import env from "dotenv";
env.config();

// データベース接続のデバッグログを追加
console.log("Attempting to connect to MongoDB...");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

// CORSの設定を追加
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: false,
  })
);

app.use(express.json());

// 静的ファイルの提供を先に設定
app.use(express.static("../frontend/dist"));

// APIルートの設定
app.use("/api", apiRoutes);

// すべてのルートをindex.htmlにリダイレクト（SPAのため）
app.get("*", (req, res) => {
  const indexHtml = path.resolve("../frontend/dist", "index.html");
  res.sendFile(indexHtml);
});

// エラーハンドリング
app.use(function (req, res) {
  res.status(404).json({ msg: "Page Not Found" });
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: "不正なエラーが発生しました。" });
});

app.listen(port, function () {
  console.log(`Server Start: http://localhost:${port}`);
});
