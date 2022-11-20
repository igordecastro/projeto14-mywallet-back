import Joi from "joi";

export const walletSchema = Joi.object({
    value: Joi.number().required(),
    type: Joi.string().valid('expense', 'income').required(),
    description: Joi.string().required().min(3).max(25),
    date: Joi.string()
})