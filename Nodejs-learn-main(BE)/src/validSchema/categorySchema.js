import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required().min(6).max(255).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must have at least 6 characters",
    "string.max": "Name must have at least 255 characters",
  }),
  description: Joi.string().messages({
    "string.base": "description must be a string",
  }),
  slug: Joi.string().required().min(6).max(255).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must have at least 6 characters",
    "string.max": "Name must have at least 255 characters",
  }),
  category: Joi.string().messages({
    "string.base": "category must be a string",
  }),
});
