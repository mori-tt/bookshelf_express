import express from "express";
import booksRouter from "./books.mjs";

const router = express.Router();
router.use("/books", booksRouter);

export default router;
