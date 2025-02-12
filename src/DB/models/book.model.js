import mongoose from "mongoose";
const bookSchema= new mongoose.Schema({
    title:{
        type: String,
        lowercase: true,
        trim: true,
        minLength: [3, 'Name must be at least 3 characters long.'],
        maxLength: [100, 'Name must be at most 100 characters long.'],
        required: [true, 'title is required.']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'author is required.']
    },
    publishedYear:{
        type: Number,
        required: [true, 'publishedYear is required.'] 
    },
    genre:{
        type: String,
        required: [true, 'genre is required.']
       
    },
    availableCopies:{
        type: Number,
        required: [true, 'availableCopies is required.'] ,
        default: 0
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
    

},{timestamps:true})

export const bookModel=mongoose.models.Book||mongoose.model('Book',bookSchema)
