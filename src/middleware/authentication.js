import {userModel} from "../DB/models/index.js";
import { VerifyToken } from "../utils/index.js";
export const tokenTypes={
    access:'access',
    refresh:'refresh'
}


export const graphQlAuth=async({authorization,tokenType=tokenTypes.access,accessRoles=[]})=>{

    if(!authorization){
        throw new Error('Token Not Found',{cause:404})
    }
    const [prefix,token]=authorization.split(' ')

    if(!prefix){
        throw new Error('Token prefix not found', { cause: 404 });
    }
    if(!token){
        throw new Error('Token not found', { cause: 404 });
    }
    let JWT_SECRET=undefined
    if(prefix==process.env.PREFIX_FOR_USER){
        JWT_SECRET=tokenType===tokenTypes.access?process.env.ACCESS_JWT_SECRET_USER:process.env.REFRESH_JWT_SECRET_USER
    }else if(prefix==process.env.PREFIX_FOR_ADMIN){
        JWT_SECRET=tokenType===tokenTypes.access?process.env.ACCESS_JWT_SECRET_ADMIN:process.env.REFRESH_JWT_SECRET_ADMIN
    }else{
        throw new Error('Invalid token prefix. Unauthorized access.',{cause:400})
    }

    const payload= await VerifyToken({token,JWT_SECRET})
    if(!payload?.email||!payload?.id){
        throw new Error('Invalid token payload',{cause:400})
    }
    const user= await userModel.findById({_id:payload.id})
    if(!user){
        throw new Error('User Not Found',{cause:404})
    }
    if(user?.isDeleted){
        throw new Error('User Is Deleted(Soft Delete)', { cause: 400 });
    }
    if(parseInt(user?.changedPasswordAt?.getTime()/1000) > payload.iat){
        throw new Error('Token has expired. Please log in again.', { cause: 400 });
    }
    if(!accessRoles.includes(user.role)){
        throw new Error('Access denied: You do not have the required permissions.',{cause:403})
    }
    return user

}

