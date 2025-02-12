import { GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import * as borrowedBookResolve from "./borrowedBook.resolve.js";
import * as borrowedBookTypes from "./borrowedBook.types.js";

export const borrowedBookMutation={
    borrowBook:{
        type:borrowedBookTypes.borrowBookResponseType,
        args: {
           
            bookId: { type: new GraphQLNonNull(GraphQLID) },
            authorization:{type: new GraphQLNonNull(GraphQLString)}
        },
        resolve:borrowedBookResolve.borrowBook
    },
    markBookAsAvailable:{
        type:borrowedBookTypes.markBookAsAvailableType,
        args: {
          
            borrowedBookId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve:borrowedBookResolve.markBookAsAvailable
    },
    

    

}
export const borrowedBookQuery={
    getBorrowedBookById:{
        type:borrowedBookTypes.borrowedBookType,
        args:{
            id:{type:GraphQLID}
        },
        resolve:borrowedBookResolve.getOneBorrowedBookById
    },
    getAllBorrowedBooks:{
        type:borrowedBookTypes.getAllBorrowedBooksType,
        resolve:borrowedBookResolve.getAllBorrowedBook
    },
    getOverdueBooks:{
        type:borrowedBookTypes.getOverdueBooksType,
    
        resolve:borrowedBookResolve.getOverdueBooks
    }
}