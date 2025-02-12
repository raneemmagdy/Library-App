import { AppGeneralError } from "../../../utils/globalErrorHandling/index.js"
import validation from "../../../middleware/validation.js"
import * as  libraryValidation  from "../library.validation.js";
import { libraryModel } from "../../../DB/models/library.model.js";
import mongoose from "mongoose";
import { bookModel } from "../../../DB/models/book.model.js";






export const addLibrary = async (parent, args) => {
    
    const { name, location, books = [] } = args;

    const bookIds = books.map(bookId => bookId.toString());

    const foundBooks = await bookModel.find({ _id: { $in: bookIds } });
    if (foundBooks.length !== books.length) {
        throw new AppGeneralError("One or more book IDs are invalid", 400);
    }

    const library = await libraryModel.create({
        name,
        location,
        books: bookIds
    });

    
    const populatedLibrary = await libraryModel.findById(library._id).populate("books");

    return { message: "Library added successfully", library: populatedLibrary };
};



export const getOnelibraryById=async(parent,args)=>{
      const{id}=args
      await validation({ schema: libraryValidation.getOneLibraryByIdSchema, data: { id } });
      const library= await libraryModel.findById(id).populate({path:'books'})
      if(!library){
        throw new AppGeneralError('Library Not Found',404)
      }
      return library
}
export const getAllLibraries=async()=>{
      const Libraries= await libraryModel.find().populate({path:'books'})
      return Libraries

}



