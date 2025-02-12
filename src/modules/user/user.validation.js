import Joi from "joi";
import { generalRules } from "../../utils/index.js";
export const registerSchema=Joi.object({
    name: Joi.string().min(3).max(30).messages({
        'string.min': 'Name must be more than 3 characters.',
        'string.max': 'Name must be less than 30 characters.',
        'any.required': 'Name is required.'
    }).required(),
    email: generalRules.email.required(),
    password: generalRules.password.required(),
    cPassword: generalRules.password.valid(Joi.ref('password')).messages({
        'any.only': 'Confirm password must match the password.',
        'any.required': 'Confirm password is required.'
    }).required(),
    phone: Joi.string().regex(/^01[0125][0-9]{8}$/).messages({
        'string.pattern.base': 'Phone number must be an Egyptian number and start with 010, 011, 012, or 015 followed by 8 digits.',
        'any.required': 'Phone number is required.'
    }).required(),
   
    
})
export const loginSchema=Joi.object({
    email: generalRules.email.required(),
    password: generalRules.password.required()
})
export const getOneUserByIdSchema=Joi.object({
    id: generalRules.ObjectId.required() 
})
export const authorizationSchema=Joi.object({
    authorization: Joi.string().required().messages({
        "string.empty": "Authorization token is required.",
        "any.required": "Authorization token is required.",
    }) 
})
export const confirmSchema=Joi.object({
    email: generalRules.email.required(),
    otp: Joi.string().length(4).required().messages({
        'any.required': 'otp is required.',
        'string.length': 'OTP must be exactly 4 characters long.'
    })
    
})

