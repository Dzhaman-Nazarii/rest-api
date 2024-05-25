const Joi = require('joi');

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.string(),
})

const updateContactSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.string(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.string().required(),
})

module.exports = {createContactSchema, updateContactSchema, updateFavoriteSchema};