import { AppGeneralError } from "../../../utils/globalErrorHandling/index.js"
import validation from "../../../middleware/validation.js"
import { bookModel } from "../../../DB/models/book.model.js";
import * as bookValidation from "../book.validation.js";





export const getOneBookById=async(parent,args)=>{
      const{id}=args
      await validation({ schema: bookValidation.getOneBookByIdSchema, data: { id } });
      const book= await bookModel.findById(id)
      if(!book){
        throw new AppGeneralError('Book Not Found',404)
      }
      return book

}
export const getAllBooks=async()=>{
      const books= await bookModel.find()
      return books

}


export const addBook = async (parent, args) => {
    await validation({ schema: bookValidation.bookSchema, data: args });

    const book = await bookModel.create(args);

    return { message: "Book added successfully", book };
};
