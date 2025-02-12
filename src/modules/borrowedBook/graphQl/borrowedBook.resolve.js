import { AppGeneralError } from "../../../utils/globalErrorHandling/index.js"
import validation from "../../../middleware/validation.js"
import * as  borrowedBookValidation  from "../borrowedBook.validation.js";
import { borrowedBookModel } from "../../../DB/models/borrowedBook.model.js";
import { bookModel } from "../../../DB/models/book.model.js";
import { roleOptions, userModel } from "../../../DB/models/user.model.js";
import { graphQlAuth } from "../../../middleware/authentication.js";


export const borrowBook = async (parent, args) => {
    const { authorization } = args;

    const authUser = await graphQlAuth({ 
        authorization, 
        accessRoles: [roleOptions.user] 
    });

    if (!authUser) {
        throw new AppGeneralError("Unauthorized: You must be logged in to borrow a book.", 401);
    }

 
    await validation({ schema: borrowedBookValidation.borrowedBookSchema, data: args });

    const book = await bookModel.findById(args.bookId);
    if (!book) throw new AppGeneralError("Book not found", 404);
    if (book.availableCopies < 1) throw new AppGeneralError("No copies available", 400);
    const userId = authUser._id;

    const user = await userModel.findById(userId);
    if (!user) throw new AppGeneralError("User not found", 404);

    const borrowedAt = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowedAt.getDate() + 2);

    const borrowedBook = await borrowedBookModel.create({
        userId,
        bookId: args.bookId,
        borrowedAt,
        dueDate,
        returned: false
    });

    book.availableCopies -= 1;
    await book.save();

    user.borrowedBooks.push(book._id);
    await user.save();

   
    const populatedBorrowedBook = await borrowedBookModel.findById(borrowedBook._id).populate("bookId");

    return { message: "Book borrowed successfully", borrowedBook: populatedBorrowedBook };
};


export const markBookAsAvailable = async (parent, args) => {
    
      await validation({ schema: borrowedBookValidation.markBookAsAvailableSchema, data: args });
      const { borrowedBookId } = args;
      const borrowedBook = await borrowedBookModel.findById(borrowedBookId);
      if (!borrowedBook) {
          throw new AppGeneralError("Borrowed book record not found", 404);
      }
      if (borrowedBook.returned) {
          throw new AppGeneralError("This book is already marked as returned.", 400);
      }
      borrowedBook.returned = true;
      await borrowedBook.save();
      await bookModel.findByIdAndUpdate(
          borrowedBook.bookId,
          { $inc: { availableCopies: 1 } },
          { new: true }
      );
      return { message: "Book marked as available again successfully." };
};
export const getOneBorrowedBookById=async(parent,args)=>{
      const{id}=args
      await validation({ schema: borrowedBookValidation.getOneBorrowedBookByIdSchema, data: { id } });
      const borrowedBook= await borrowedBookModel.findById(id).populate({path:'bookId'})
      if(!borrowedBook){
        throw new AppGeneralError('borrowedBook Not Found',404)
      }
      return borrowedBook
}
export const getAllBorrowedBook=async()=>{
      const borrowedBooks= await borrowedBookModel.find().populate({path:'bookId'})
      return borrowedBooks

}
export const getOverdueBooks = async () => {
    const currentDate = new Date();
    const overdueBooks = await borrowedBookModel.find({
        dueDate: { $lt: currentDate },  
        returned: false                 
    }).populate({path:"bookId"});
    return {overdueBooks};
};