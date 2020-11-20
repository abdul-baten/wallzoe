import {
  ADD_POST_DIALOG_OPEN,
  ADD_POST_DIALOG_CLOSE,
  SELECTED_SM_ACCOUNT,
  SCHEDULE_AT,
  SCHEDULE_TIMEZONE,
  SCHEDULE_ID,
  SCHEDULE_TOKEN,
  SCHEDULE_FOR,
  SCHEDULE_FILES,
  SCHEDULE_TEXT_CONTENT
} from './types'

export const addPostDialogOpen = () => ({ type: ADD_POST_DIALOG_OPEN })

export const addPostDialogClose = () => ({ type: ADD_POST_DIALOG_CLOSE })

export const setScheduleAt = dateTime => ({ type: SCHEDULE_AT, dateTime })

export const setScheduleTimezone = offset => ({
  type: SCHEDULE_TIMEZONE,
  offset
})

export const setScheduleFor = sType => ({ type: SCHEDULE_FOR, sType })

export const selectedSMAccount = () => ({ type: SELECTED_SM_ACCOUNT })

export const setScheduleId = id => ({ type: SCHEDULE_ID, id })

export const setScheduleToken = token => ({ type: SCHEDULE_TOKEN, token })

export const setScheduleFiles = files => ({ type: SCHEDULE_FILES, files })
export const setScheduleTextContent = textContent => ({
  type: SCHEDULE_TEXT_CONTENT,
  textContent
})
