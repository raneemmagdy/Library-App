import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import * as bookResolve from "./book.resolve.js";
import * as bookTypes from "./book.types.js";

export const bookMutation={
    addBook:{
        type:bookTypes.addBookType,
        args:{
            title: { type: new GraphQLNonNull(GraphQLString) },
            author: { type: new GraphQLNonNull(GraphQLString) },
            publishedYear: { type: new GraphQLNonNull(GraphQLInt) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            availableCopies: { type: GraphQLInt }
        },
        resolve:bookResolve.addBook
    },
  
    

}
export const BookQuery={
    getBookById:{
        type:bookTypes.bookType,
        args:{
            id:{type:GraphQLID}
        },
        resolve:bookResolve.getOneBookById
    },
    getAllBooks:{
        type:bookTypes.getAllBooksType,
       
        resolve:bookResolve.getAllBooks
    }
}