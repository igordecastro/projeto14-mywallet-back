import Joi from "joi";

export const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(16),
    email: Joi.string().email().required(),
})