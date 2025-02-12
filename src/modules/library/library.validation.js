import Joi from "joi";
import { generalRules } from "../../utils/index.js";


export const addLibrarySchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.empty": "Library name is required.",
        "string.min": "Library name must be at least 3 characters.",
        "string.max": "Library name must be at most 50 characters.",
        "any.required": "Library name is required."
    }),
    location: Joi.string().required().messages({
        "string.empty": "Library location is required.",
        "any.required": "Library location is required."
    }),
    books: Joi.array().items(Joi.string()).default([])
});
export const getOneLibraryByIdSchema = Joi.object({
    id:generalRules.ObjectId.required()

});