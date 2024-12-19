import express from "express";
import apiRoutes from "./api-routes/index.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(port, function () {
  console.log(`Server Start: http://localhost:${port}`);
});
