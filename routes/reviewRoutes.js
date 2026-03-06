import express from "express";
import Review from "../models/Review.js";
import {
  createReview,
  getBookReviews,
  updateReview,
  voteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
/*
GET REVIEWS FOR BOOK
GET /api/reviews/:bookId
*/
router.get("/:bookId", getBookReviews);
router.put("/:reviewId", updateReview);
router.post("/:reviewId/vote", voteReview);

export default router;
