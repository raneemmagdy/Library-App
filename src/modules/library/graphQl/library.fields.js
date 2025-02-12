import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import * as libraryResolve from "./library.resolve.js";
import * as libraryTypes from "./library.types.js";

export const libraryMutation={
    addLibrary:{
        type:libraryTypes.addLibraryType,
        args: {
            name: { type:GraphQLString  },
            location: { type: GraphQLString },
            books: { type: new GraphQLList(GraphQLID) }
        },
        resolve:libraryResolve.addLibrary
    },
    

}
export const libraryQuery={
    getlibraryById:{
        type:libraryTypes.libraryType,
        args:{
            id:{type:GraphQLID}
        },
        resolve:libraryResolve.getOnelibraryById
    },
    getAlllibrarys:{
        type:libraryTypes.getAllLibraries,
        resolve:libraryResolve.getAllLibraries
    }
}