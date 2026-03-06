import axios from "axios";
import Book from "../models/Book.js";

/*
SEARCH BOOKS FROM OPEN LIBRARY
*/
export const searchBooks = async (req, res) => {
  try {

    const { q, page = 1 } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query required" });
    }

    const response = await axios.get("https://openlibrary.org/search.json", {
      params: { q, page }
    });

    const books = response.data.docs.slice(0, 10).map((book) => {

      const coverImage = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null;

      return {
        title: book.title || "Unknown title",
        author: book.author_name?.[0] || "Unknown",
        publishYear: book.first_publish_year || null,
        coverImage,
        openLibraryId: book.key
      };

    });

    res.json({
      total: response.data.numFound,
      results: books
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};


/*
GET BOOK DETAILS
SAVE BOOK IF NOT EXISTS
*/
export const getBookDetails = async (req, res) => {

  try {

    const { type, id } = req.params;

    const openLibraryId = `/${type}/${id}`;

    const existingBook = await Book.findOne({ openLibraryId });

    if (existingBook) {
      return res.json(existingBook);
    }

    const response = await axios.get(
      `https://openlibrary.org${openLibraryId}.json`
    );

    const data = response.data;

    const newBook = await Book.create({
      openLibraryId,
      title: data.title,
      description: data.description?.value || "",
      subjects: data.subjects || []
    });

    res.json(newBook);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch book details" });
  }

};