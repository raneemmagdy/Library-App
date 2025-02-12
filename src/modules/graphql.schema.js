import {  GraphQLObjectType, GraphQLSchema } from "graphql";
import { userMutation, userQuery } from "./user/graphQl/user.fields.js";
import { bookMutation, BookQuery } from "./book/graphQl/book.fields.js";
import { borrowedBookMutation, borrowedBookQuery } from "./borrowedBook/graphQl/borrowedBook.fields.js";
import { libraryMutation, libraryQuery } from "./library/graphQl/library.fields.js";

export const schema=new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'Query',
        fields:{
            ...userQuery,...BookQuery,...borrowedBookQuery,...libraryQuery
            
        }
    }),
    mutation:new GraphQLObjectType({
        name:'Mutation',
        fields:{
            ...userMutation,...bookMutation,...borrowedBookMutation,...libraryMutation
        }
    })
})