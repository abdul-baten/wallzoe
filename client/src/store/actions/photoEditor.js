import {
  PHOTO_EDITOR_OPEN,
  PHOTO_EDITOR_CLOSE,
  CURRENT_IMAGE,
  EDITOR_IMAGE
} from './types'

export const photoEditorOpen = () => {
  return {
    type: PHOTO_EDITOR_OPEN
  }
}

export const photoEditorClose = () => {
  return {
    type: PHOTO_EDITOR_CLOSE
  }
}

export const setCurrentImage = image => {
  return {
    type: CURRENT_IMAGE,
    image
  }
}

export const setEditorImage = image => {
  return {
    type: EDITOR_IMAGE,
    image
  }
}
