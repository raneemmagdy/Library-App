import Joi from "joi";
import { generalRules } from "../../utils/index.js";
export const borrowedBookSchema = Joi.object({
    authorization:Joi.string().required(),
    bookId: generalRules.ObjectId.required().messages({
        "string.pattern.base": "Book ID must be a valid MongoDB ObjectId.",
        "any.required": "Book ID is required."
    }),

    borrowedAt: Joi.date().iso().default(() => new Date()).messages({
        "date.format": "Borrowed date must be a valid ISO date."
    }),

    dueDate: Joi.date().iso().greater(Joi.ref("borrowedAt")).messages({
        "date.format": "Due date must be a valid ISO date.",
        "date.greater": "Due date must be after the borrowed date."
    }),

    returned: Joi.boolean().default(false)
});

export const getOneBorrowedBookByIdSchema = Joi.object({
    id:generalRules.ObjectId.required()
});

export const markBookAsAvailableSchema = Joi.object({
    borrowedBookId: generalRules.ObjectId.required().messages({
        "string.empty": "Borrowed book ID is required.",
        "any.required": "Borrowed book ID is required."
    })
});