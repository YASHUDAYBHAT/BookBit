import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  reviewText: {
    type: String
  },

  upvotes: {
    type: Number,
    default: 0
  },

  downvotes: {
    type: Number,
    default: 0
  },

}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema);