import {
  DIALOG_OPEN,
  DIALOG_CLOSE,
  APPS_MENU_OPEN,
  APPS_MENU_CLOSE
} from './types'

export const dialogOpen = () => {
  return { type: DIALOG_OPEN }
}

export const dialogClose = () => {
  return { type: DIALOG_CLOSE }
}

export const appsMenuOpen = () => {
  return { type: APPS_MENU_OPEN }
}

export const appsMenuClose = () => {
  return { type: APPS_MENU_CLOSE }
}
