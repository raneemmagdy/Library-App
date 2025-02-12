import mongoose from "mongoose";
const borrowedBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required."],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "bookId is required."],
    },
    borrowedAt: {
      type: Date,
      required: [true, "borrowedAt is required."],
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: [true, "dueDate is required."],
    },
    returned: {
      type: Boolean,
      default: false, 
    }
  },
  { timestamps: true }
);

export const borrowedBookModel =
  mongoose.models.BorrowedBook ||
  mongoose.model("BorrowedBook", borrowedBookSchema);
