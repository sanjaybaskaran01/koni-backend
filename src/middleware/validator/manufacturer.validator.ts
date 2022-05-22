import Joi from "joi";

export const manufacturerSchema = Joi.object({
    name: Joi.string().required(),
})

export const updateManufacturerSchema = Joi.object({
    ID: Joi.string().guid().required(),
    name: Joi.string().required(),
})

export const manufacturerParamSchema = Joi.object({
    name:Joi.string().required()
})

