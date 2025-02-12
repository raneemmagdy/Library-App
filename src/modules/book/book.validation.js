import Joi from "joi";
import { generalRules } from "../../utils/index.js";

export const bookSchema = Joi.object({
    title: Joi.string().min(3).max(100).messages({
        "string.min": "Title must be at least 3 characters long.",
        "string.max": "Title must be at most 100 characters long.",
        "any.required": "Title is required."
    }).required(),

    author: generalRules.ObjectId.messages({
        "string.pattern.base": "Author ID must be a valid MongoDB ObjectId.",
        "any.required": "Author is required."
    }).required(),

    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).messages({
        "number.min": "Published year must be a valid year.",
        "number.max": `Published year cannot be greater than ${new Date().getFullYear()}.`,
        "any.required": "Published year is required."
    }).required(),

    genre: Joi.string().messages({
        "any.required": "Genre is required."
    }).required(),

    availableCopies: Joi.number().integer().min(0).messages({
        "number.min": "Available copies cannot be negative.",
        "any.required": "Available copies are required."
    }).required()

});
export const getOneBookByIdSchema = Joi.object({
    id:generalRules.ObjectId.required()

});