import {
  PROJECTNAME,
  PROJECTTODONAME
} from './types'

export const setProjectName = name => {
  return {
    type: PROJECTNAME,
    name
  }
}

export const setProjectTodoName = name => {
  return {
    type: PROJECTTODONAME,
    name
  }
}