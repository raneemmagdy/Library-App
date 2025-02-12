import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import * as userResolve from "./user.resolve.js";
import * as userTypes from "./user.types.js";

export const userMutation={
    registerUser:{
        type:userTypes.userRegisterType,
        args:{
            name:{type:GraphQLString},
            email:{type:GraphQLString},
            password:{type:GraphQLString},
            cPassword:{type:GraphQLString},
            phone:{type:GraphQLString}
        },
        resolve:userResolve.registerUser
    },
    loginUser:{
        type:userTypes.tokenType,
        args:{
            email:{type:GraphQLString},
            password:{type:GraphQLString}
          
        },
        resolve:userResolve.loginUser
    },
    
    deleteUser:{
        type:userTypes.messageType,
        args:{
            authorization:{type:GraphQLString},
        },
        resolve:userResolve.deleteUser
    },
    
    refreshTokenUser:{
        type:userTypes.tokenType,
        args:{
            authorization:{type:GraphQLString}
        },
        resolve:userResolve.refreshTokenCheck
    },
    
    confirmEmailUser:{
        type:userTypes.messageType,
        args:{
            otp:{type:GraphQLString},
            email:{type:GraphQLString},
        },
        resolve:userResolve.confirmEmail
    },
    

}
export const userQuery={
    getUserById:{
        type:userTypes.userType,
        args:{
            id:{type:GraphQLID}
        },
        resolve:userResolve.getOneUserById
    },
    getAllUsers:{
        type:userTypes.getAllUsersType,
       
        resolve:userResolve.getAllUsers
    }
}