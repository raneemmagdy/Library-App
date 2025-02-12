import mongoose from "mongoose";
const librarySchema= new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        trim: true,
        minLength: [3, 'Name must be at least 3 characters long.'],
        maxLength: [50, 'Name must be at most 50 characters long.'],
        required: [true, 'name is required.']
    },

    location:{
        type: String,
        required: [true, 'location is required.']
       
    },
    books:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book',
            default: []
        }
    ]
    

},{timestamps:true})

export const libraryModel=mongoose.models.Library||mongoose.model('Library',librarySchema)
