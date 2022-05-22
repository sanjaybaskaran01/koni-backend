import { createValidator } from 'express-joi-validation'
import Joi from 'joi'

const paramIDSchema = Joi.object({
    ID: Joi.string().guid().required()
})
const validator = createValidator({
    passError: true
})


export { equipmentSchema, updateEquipmentSchema, equipmentParamSchema } from './equipment.validator'
export { manufacturerSchema, updateManufacturerSchema, manufacturerParamSchema } from './manufacturer.validator'
export { paramIDSchema, validator }