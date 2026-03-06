import express from "express";
import Book from "../models/Book.js";
import { searchBooks, getBookDetails } from "../controllers/bookController.js";

const router = express.Router();

/*
SEARCH BOOKS FROM OPEN LIBRARY
GET /api/books/search?q=harry+potter
*/
router.get("/search", searchBooks);

/*
GET BOOK DETAILS (auto-save if not exists)
GET /api/books/:openLibraryId
*/
router.get("/:type/:id", getBookDetails);

/*
GET BOOKS FROM YOUR DATABASE
GET /api/books
*/
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().limit(20);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
CREATE BOOK IN DATABASE
POST /api/books
*/
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;