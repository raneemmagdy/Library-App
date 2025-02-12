import { GraphQLBoolean,GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { bookType } from "../../book/graphQl/book.types.js";

export const borrowedBookType=new GraphQLObjectType({
    name:'BorrowedBookType',
    fields:{
        id:{type:GraphQLID},
        userId:{type:GraphQLID},
        bookId:{type:bookType},
        borrowedAt:{type:GraphQLString},
        dueDate:{type:GraphQLString},
        returned:{type:GraphQLBoolean},
       
    }
})
export const getAllBorrowedBooksType=new GraphQLList(borrowedBookType)

export const borrowBookResponseType = new GraphQLObjectType({
    name: "BorrowBookResponse",
    fields: {
        message: { type: GraphQLString },
        borrowedBook: { type: borrowedBookType }
    }
});
export const markBookAsAvailableType = new GraphQLObjectType({
    name: "markBookAsAvailableType",
    fields: {
        message: { type: GraphQLString }
    }
});
export const getOverdueBooksType = new GraphQLObjectType({
    name: "getOverdueBooksType",
    fields: {
        overdueBooks: { type: new GraphQLList(borrowedBookType) }
    }
});

