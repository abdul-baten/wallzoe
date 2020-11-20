import React from 'react'
import TUIImageEditor from '@toast-ui/react-image-editor'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { PHOTO_EDITOR_URL } from '../../config/'
import {
  photoEditorClose,
  setCurrentImage,
  setEditorImage,
  addPostDialogOpen,
  setScheduleFor,
  selectedSMAccount,
  setScheduleAt,
  setScheduleFiles
} from '../../store/actions'

import {
  modifyToolbox,
  useSubActionBtns,
  useMainActionBtns,
  customTheme
} from './helper/'

import './PhotoEditor.scss'
import './tui-image-editor.css'
import './tui-color-picker.css'

class PhotoEditor extends React.Component {
  editorRef = React.createRef()

  componentDidMount = async () => {
    const editorInstance = this.editorRef.current.getInstance()

    /* Modify photo editor toolbox appearance */
    modifyToolbox()

    /* action buttons */

    if (window.location.pathname === PHOTO_EDITOR_URL) {
      // action buttons for main photo editor url
      useMainActionBtns(this, editorInstance)
    } else {
      // action buttons when open from scheduler interface
      useSubActionBtns(this, editorInstance)
    }
  }

  render() {
    return (
      <div className="WallzoePhotoEditorDialog">
        <TUIImageEditor
          ref={this.editorRef}
          includeUI={{
            loadImage: {
              path: this.props.currentImage.blobUrl,
              name: this.props.currentImage.name
            },
            theme: customTheme,
            initMenu: 'filter',
            menuBarPosition: 'left'
          }}
          selectionStyle={{
            cornerStyle: 'circle',
            cornerSize: 10,
            cornerColor: '#fff',
            borderColor: '#fff',
            transparentCorners: true,
            rotatingPointOffset: 30
          }}
          usageStatistics={false}
        />
        )
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentImage: state.photoEditor.currentImage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    photoEditorClose: () => dispatch(photoEditorClose()),
    setCurrentImage: image => dispatch(setCurrentImage(image)),
    setEditorImage: image => dispatch(setEditorImage(image)),
    addPostDialogOpen: () => dispatch(addPostDialogOpen()),
    selectedSMAccount: () => dispatch(selectedSMAccount()),
    setScheduleFor: sType => dispatch(setScheduleFor(sType)),
    setScheduleAt: dateTime => dispatch(setScheduleAt(dateTime)),
    setScheduleFiles: files => dispatch(setScheduleFiles(files))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PhotoEditor))
