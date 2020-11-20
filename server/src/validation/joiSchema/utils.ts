import Joi from './joi'

export const email = Joi.string()
  .email()
  .required()
  .label('Email')

export const usernameOrEmail = Joi.string()
  .required()
  .label('Email')

export const username = Joi.string()
  .alphanum()
  .min(4)
  .max(50)
  .required()
  .label('Username')

export const passwordSignUp = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,50}$/)
  .error(
    new Error(
      'Must have one lowercase character, one uppercase character, one number, one special character, and length at least 8'
    )
  )
  .required()
  .label('Password')

  
export const signInPassword = Joi.string()
  .required()
  .label('Password')

// validate object ID
export const ID = Joi.string()
  .ObjectId()
  .label('Object ID')

export const projectname = Joi.string()
  .min(4)
  .max(50)
  .required()
  .label('Projectname')
export const projectTodoName = Joi.string()
  .min(4)
  .max(50)
  .required()
  .label('ProjectTodoName')
export const projectTodoDetail = Joi.string()
  .allow('')
  .label('ProjectTodoDetail')
export const projectDesc = Joi.string()
  .allow('')
  .label('ProjectDesc')
