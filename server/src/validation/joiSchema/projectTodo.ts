import Joi from '@hapi/joi'

import {
  projectTodoName,
  projectTodoDetail,
  ID
} from './utils'

export const addTodoFields = Joi.object().keys({
  name: projectTodoName,
  detail: projectTodoDetail,
  projectId: ID
})
