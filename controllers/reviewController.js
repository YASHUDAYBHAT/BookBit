import Review from "../models/Review.js";
import Book from "../models/Book.js";

/*
CREATE REVIEW
*/
export const createReview = async (req, res) => {

  try {

    const { userId, bookId, rating, reviewText } = req.body;

    const existingReview = await Review.findOne({
      userId,
      bookId
    });

    if (existingReview) {
      return res.status(400).json({
        message: "User already reviewed this book"
      });
    }

    const review = await Review.create({
      userId,
      bookId,
      rating,
      reviewText
    });

    const reviews = await Review.find({
        bookId: req.params.bookId
        })
        .sort({ upvotes: -1 })
        .populate("userId", "username");

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const updateReview = async (req, res) => {

  try {

    const { reviewId } = req.params;

    const { rating, reviewText } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, reviewText },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const voteReview = async (req, res) => {

  try {

    const { reviewId } = req.params;
    const { type } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    if (type === "upvote") {
      review.upvotes += 1;
    }

    if (type === "downvote") {
      review.downvotes += 1;
    }

    await review.save();

    res.json(review);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};

/*
GET REVIEWS FOR BOOK
*/
export const getBookReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      bookId: req.params.bookId
    }).populate("userId", "username");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};