import mongoose from "mongoose";
export const roleOptions={
    user:'user',
    admin:'admin'
}
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        trim: true,
        minLength: [3, 'Name must be at least 3 characters long.'],
        maxLength: [30, 'Name must be at most 30 characters long.'],
        required: [true, 'Name is required.']

    },
    email:{
        type: String,
        lowercase: true,
        required: [true, 'Email is required.'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email address.'],
        unique:[true,'Email already Exist']
        
    },
    password:{
        type: String,
        minLength: [8, 'Password must be at least 8 characters long.'], 
        required: [true, 'Password is required.']
       
    },
    phone:{
        type: String,
        unique:[true,'Phone already Exist'],
        required: [true, 'Phone is required.']
        
    },
    confirmed:{
        type:Boolean,
        default:false,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    changedPasswordAt:Date,
    borrowedBooks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        default: []
    }],
    role:{
        type:String,
        enum:Object.values(roleOptions),
        default:roleOptions.user,
        
    },
    otpEmail:{
        type:String
        
    },
    otpCreatedAt:{
        type:Date
    }

},{timestamps:true})

export const userModel=mongoose.models.User||mongoose.model('User',userSchema)
