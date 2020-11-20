import {
  PROJECTNAME,
  PROJECTTODONAME
} from '../actions/types'

const initialState = {
  projectName: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  projectTodoName: {
    value: '',
    isValid: true,
    errMsg: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTNAME:
      return { ...state, projectName: action.name }
    case PROJECTTODONAME:
      return { ...state, projectTodoName: action.name }
    default:
      return state;
  }
}

export default reducer
