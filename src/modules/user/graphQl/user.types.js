import { GraphQLBoolean, GraphQLEnumType, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const userType=new GraphQLObjectType({
    name:'UserType',
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        phone:{type:GraphQLString},
        isDeleted:{type:GraphQLBoolean},
        confirmed:{type:GraphQLBoolean},
        role:{type:new GraphQLEnumType({
            name:'Role',
            values:{
                user:{type:GraphQLString},
                admin:{type:GraphQLString},

            }
        })},
        borrowedBooks:{type:new GraphQLList(GraphQLID)}



    }

})
export const getAllUsersType=new GraphQLList(userType)

export const userRegisterType=new GraphQLObjectType({
    name:'userRegisterType',
    fields:{
        message:{type:GraphQLString},
        user:{type:userType}

    }

})

export const tokenType=new GraphQLObjectType({
    name:'TokenType',
    fields:{
        message:{type:GraphQLString},
        user:{type:userType},
        tokens:{type:new GraphQLObjectType({
            name:'Tokens',
            fields:{
                accessToken:{type:GraphQLString},
                refreshToken:{type:GraphQLString}
            }
        })}

    }

})


export const messageType=new GraphQLObjectType({
    name:'messageType',
    fields:{
        message:{type:GraphQLString}
    }
})
