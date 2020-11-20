import {
  ADD_POST_DIALOG_OPEN,
  ADD_POST_DIALOG_CLOSE,
  SELECTED_SM_ACCOUNT,
  SCHEDULE_AT,
  SCHEDULE_ID,
  SCHEDULE_TOKEN,
  SCHEDULE_FOR,
  SCHEDULE_TIMEZONE,
  SCHEDULE_FILES,
  SCHEDULE_TEXT_CONTENT
} from '../actions/types'

const initialState = {
  isAddPostDialogOpen: false,
  isSelectedSMAccount: false,
  scheduleAt: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  scheduleFor: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  scheduleId: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  scheduleToken: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  scheduleTimezone: {
    offset: '',
    isValid: true,
    errMsg: ''
  },
  scheduleTextContent: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  scheduleFiles: {
    value: [],
    isValid: true,
    errMsg: ''
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_DIALOG_OPEN:
      return { ...state, isAddPostDialogOpen: true }
    case ADD_POST_DIALOG_CLOSE:
      return { ...state, isAddPostDialogOpen: false }
    case SCHEDULE_AT:
      return { ...state, scheduleAt: action.dateTime }
    case SCHEDULE_FOR:
      return { ...state, scheduleFor: action.sType }
    case SCHEDULE_ID:
      return { ...state, scheduleId: action.id }
    case SCHEDULE_TOKEN:
      return { ...state, scheduleToken: action.token }
    case SELECTED_SM_ACCOUNT:
      if (!state.scheduleFor) {
        return { ...state, isSelectedSMAccount: false }
      }
      return { ...state, isSelectedSMAccount: true }
    case SCHEDULE_TIMEZONE:
      return { ...state, scheduleTimezone: action.offset }
    case SCHEDULE_TEXT_CONTENT:
      return { ...state, scheduleTextContent: action.textContent }
    case SCHEDULE_FILES:
      return { ...state, scheduleFiles: action.files }
    default:
      return state
  }
}

export default reducer
