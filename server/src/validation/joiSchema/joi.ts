import Joi from '@hapi/joi'
import { Types } from 'mongoose'

const ObjectId = (joi: any) => ({
  name: 'string',
  base: joi.string(),
  language: {
    ObjectId: 'Must be a valid Object ID'
  },
  rules: [
    {
      name: 'ObjectId',
      validate(params: any, value: string, state: any, options: any) {
        if (!Types.ObjectId.isValid(value)) {
          return this.createError('string.ObjectId', {}, state, options)
        }
        return value
      }
    }
  ]
})

export default Joi.extend(ObjectId)
