import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({

  openLibraryId: {
    type: String,
    required: true,
    unique: true
  },

  title: String,
  author: String,
  description: String,
  coverImage: String,
  publishedYear: Number,
  subjects: [String],
  
  averageRating: {
    type: Number,
    default: 0
  },
  
  ratingsCount: {
    type: Number,
    default: 0
  }
  
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);