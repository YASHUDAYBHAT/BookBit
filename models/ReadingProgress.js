import mongoose from "mongoose";

const ReadingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  bookId: mongoose.Schema.Types.ObjectId,
  status: String,
  progress: Number
}, { timestamps: true });

export default mongoose.model("ReadingProgress", ReadingSchema);