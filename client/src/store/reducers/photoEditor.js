import {
  PHOTO_EDITOR_OPEN,
  PHOTO_EDITOR_CLOSE,
  CURRENT_IMAGE,
  EDITOR_IMAGE
} from '../actions/types'

const initialState = {
  isPhotoEditorOpen: false,
  isPhotoLoaded: false,
  countUpImg: 0,
  editorImage: {
    id: null,
    name: null,
    blobUrl: null
  },
  currentImage: {
    id: null,
    name: null,
    blobUrl: null
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_EDITOR_OPEN:
      return { ...state, isPhotoEditorOpen: true }
    case PHOTO_EDITOR_CLOSE:
      return { ...state, isPhotoEditorOpen: false }
    case CURRENT_IMAGE:
      return { ...state, currentImage: action.image }
    case EDITOR_IMAGE:
      return { ...state, editorImage: action.image }
    default:
      return state
  }
}

export default reducer
