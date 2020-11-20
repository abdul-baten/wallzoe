import {
  DIALOG_OPEN,
  DIALOG_CLOSE,
  APPS_MENU_OPEN,
  APPS_MENU_CLOSE
} from '../../store/actions/types'

const initialState = {
  isDialogOpen: false,
  isAppsMenuOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DIALOG_OPEN:
      return { ...state, isDialogOpen: true }
    case DIALOG_CLOSE:
      return { ...state, isDialogOpen: false }
    case APPS_MENU_OPEN:
      return { ...state, isAppsMenuOpen: true }
    case APPS_MENU_CLOSE:
      return { ...state, isAppsMenuOpen: false }
    default:
      return state
  }
}

export default reducer
