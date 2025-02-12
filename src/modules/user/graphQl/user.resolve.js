import { roleOptions, userModel } from "../../../DB/models/user.model.js"
import * as module from "../../../utils/index.js"
import { AppGeneralError } from "../../../utils/globalErrorHandling/index.js"
import validation from "../../../middleware/validation.js"
import * as userValidation from "../user.validation.js"
import { graphQlAuth, tokenTypes } from "../../../middleware/authentication.js"

export const registerUser=async(parent,args)=>{
      const{name,email,password,cPassword,phone}=args
      await validation({schema:userValidation.registerSchema,data:{name,email,password,cPassword,phone}})
      if(await userModel.findOne({email})){
       throw new AppGeneralError('Email Already Exist',409)
      }
      const users = await userModel.find({}, { phone: 1 });
      for (const user of users) {
          const decryptedPhone =await module.Decrypt({key:user.phone,SECRET_KEY:process.env.SECRET_KEY_PHONE}); 
          if (decryptedPhone === phone) {
            throw new AppGeneralError('Phone Already Exist',409)
          }
      }
   
      const hashPassword= await module.Hash({key:password,SALT_ROUND:process.env.SALT_ROUND})
      const encryptPhone= await module.Encrypt({key:phone,SECRET_KEY:process.env.SECRET_KEY_PHONE})
      module.emailEvent.emit('sendEmailConfirm',{name,email})
      const user= await userModel.create({name,email,password:hashPassword,phone:encryptPhone})
      return {message:"User Created Successfully",user}
      

}
export const loginUser=async(parent,args)=>{
  const{email,password}=args
   await validation({schema:userValidation.loginSchema,data:{email,password}})
     
   const  user = await userModel.findOne({ email }); 
   
   if (!user) {
      throw new  AppGeneralError('Invalid Email or Password',400);
   }
   if (!user.confirmed) {
     throw new  AppGeneralError('Email not Confirmed yet',400);
   }

   if(!await module.Compare({key:password,encryptedKey:user.password})){
     throw new  AppGeneralError('invalid Email Or Password',400)
   }
  
    const accessToken= await module.GenerateToken({payload:{email,id:user._id},JWT_SECRET:user.role==roleOptions.user?process.env.ACCESS_JWT_SECRET_USER:process.env.ACCESS_JWT_SECRET_ADMIN,option:{ expiresIn: '1h' }})
    const refreshToken= await module.GenerateToken({payload:{email,id:user._id},JWT_SECRET:user.role==roleOptions.user?process.env.REFRESH_JWT_SECRET_USER:process.env.REFRESH_JWT_SECRET_ADMIN,option:{ expiresIn: '1w' }})
   
   return {message:"User loged In Successfully",user, tokens:{accessToken,refreshToken}}

}

export const confirmEmail=async(parent,args)=>{
  const {email,otp}=args
  await validation({schema:userValidation.confirmSchema,data:{email,otp}})
  const user =await userModel.findOne({email})
  if(!user){
     throw new AppGeneralError('Email Not Exist',404)
  }
  if (user.confirmed) {
     throw new AppGeneralError('Email Already Confirmed',400)
  }
 
  const compareOtp = await module.Compare({ key: otp, encryptedKey: user.otpEmail });

  if (!compareOtp) {
    throw new AppGeneralError(`Invalid OTP!`,400)
  }

  await userModel.updateOne(
     { email: user.email },
     {
       confirmed: true ,$unset: { otpEmail: 0,otpCreatedAt:0},
     }
   );
  return {message:"Email Confirmed Successfully"}
}
export const getOneUserById=async(parent,args)=>{
      const{id}=args
      await validation({ schema: userValidation.getOneUserByIdSchema, data: { id } });
      const user= await userModel.findById(id)
      if(!user){
        throw new AppGeneralError('User Not Found',404)
      }
      return user

}
export const getAllUsers=async()=>{
      const users= await userModel.find()
      
      return users

}
export const deleteUser = async (parent, args) => {
  const { authorization } = args;
  
  await validation({schema:userValidation.authorizationSchema,data:{ authorization }})
  const user = await graphQlAuth({ authorization, accessRoles: [roleOptions.user] });

  
  const existingUser = await userModel.findById(user._id);
  if (!existingUser) {
      throw new AppGeneralError("User not found", 404);
  }


  existingUser.isDeleted = true;
  await existingUser.save();

  return { message: "User deleted successfully" };
}
export const refreshTokenCheck=async(parent,args)=>{
  const {authorization}=args
  const user= await graphQlAuth({authorization,tokenType:tokenTypes.refresh,accessRoles:[roleOptions.user,roleOptions.admin]})
  if (user.changedPasswordAt) {
     const tokenIssuedAt = payload.iat ; 
     const changedPasswordAt = parseInt(user.changedPasswordAt.getTime()/1000);
   

  
     if (tokenIssuedAt <=changedPasswordAt) {
         return next(new Error('Password was updated after this token was issued. Please log in again.', { cause: 403 }));
     }
  }
  const accessToken= await module.GenerateToken({payload:{email:user.email,id:user._id},JWT_SECRET:user.role==roleOptions.user?process.env.ACCESS_JWT_SECRET_USER:process.env.ACCESS_JWT_SECRET_ADMIN,option:{ expiresIn: '1h' }})
  const refreshToken= await module.GenerateToken({payload:{email:user.email,id:user._id},JWT_SECRET:user.role==roleOptions.user?process.env.REFRESH_JWT_SECRET_USER:process.env.REFRESH_JWT_SECRET_ADMIN,option:{ expiresIn: '1w' }})
 
  return {message:"Done",user, tokens:{accessToken,refreshToken}}
}