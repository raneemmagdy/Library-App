import { GraphQLBoolean,GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const bookType=new GraphQLObjectType({
    name:'bookType',
    fields:{
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        author:{type:GraphQLString},
        publishedYear:{type:GraphQLInt},
        genre:{type:GraphQLString},
        isDeleted:{type:GraphQLBoolean},
        availableCopies:{type:GraphQLInt}
    }

})
export const getAllBooksType=new GraphQLList(bookType)

export const addBookType= new GraphQLObjectType({
    name: "addBookType",
    fields: {
        message: { type: GraphQLString },
        book: { type: bookType }
    }
});



