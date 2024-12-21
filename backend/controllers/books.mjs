import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

async function getAllBooks(req, res) {
  try {
    const books = await Book.find().sort({ updatedAt: -1 });
    console.log("Books retrieved:", books.length);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}

async function getBookById(req, res) {
  const _id = req.params.id;
  const book = await Book.findById(_id);

  if (book === null) return res.status(404).json({ msg: "Page Not Found" });

  res.json(book);
}

async function registBook(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const book = new Book(req.body);
  const newBook = await book.save();

  res.status(201).json(newBook);
}

async function updateBook(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);

  if (book === null) return res.status(404).json({ msg: "Page Not Found" });

  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (comment !== undefined) book.comment = comment;
  if (rating !== undefined) book.rating = rating;
  await book.save();
  res.json(book);
}

async function deleteBook(req, res) {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id });

  if (deletedCount === 0)
    return res.status(404).json({ msg: "Target Book Not Found" });

  res.json({ msg: "Delete succeeded." });
}

export { getAllBooks, getBookById, registBook, updateBook, deleteBook };
