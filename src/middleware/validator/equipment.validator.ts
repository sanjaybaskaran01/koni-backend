import Joi from "joi";

export const equipmentSchema = Joi.object({
    model:Joi.string().required(),
    serialNumber:Joi.string().required(),
    manufacturer_id:Joi.string().guid().required()
})

export const updateEquipmentSchema = Joi.object({
    ID:Joi.string().guid().required(),
    model:Joi.string().required(),
    serialNumber:Joi.string().required()
})

export const equipmentParamSchema = Joi.object({
    model:Joi.string().required()
})

