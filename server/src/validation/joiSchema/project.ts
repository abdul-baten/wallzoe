import Joi from '@hapi/joi'

import {
  projectname,
  projectDesc,
  ID
} from './utils'

export const addProjectFields = Joi.object().keys({
  name: projectname,
  createdBy: ID
})

export const editProjectFields = Joi.object().keys({
  name: projectname,
  desc: projectDesc,
  id: ID
})
