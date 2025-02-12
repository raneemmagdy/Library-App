import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { bookType } from "../../book/graphQl/book.types.js";

export const libraryType=new GraphQLObjectType({
    name:'libraryType',
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        location:{type:GraphQLString},
        books:{type:new GraphQLList(bookType)},
       
    }
})
export const addLibraryType=new GraphQLObjectType({
    name:'addLibraryType',
    fields:{
        message:{type:GraphQLString},
      
        library:{type:libraryType},
       
    }
})
export const getAllLibraries=new GraphQLList(libraryType)



