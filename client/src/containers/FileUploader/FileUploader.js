import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone-uploader'

import {
  setCurrentImage,
  photoEditorOpen,
  setScheduleFiles
} from '../../store/actions'

import makeEditBtn from '../../components/FileUploader/makeEditBtn'
import updateImgPrev from '../../components/FileUploader/updateImgPrev'
import imgPrevFromOutside from '../../components/FileUploader/imgPrevFromOutside'
import changeUploadBtn from '../../components/FileUploader/changeUploadBtn'

import './styles.css'
import './FileUploader.scss'

class FileUploader extends React.Component {
  doneFileIds = []
  ICIdAttr = 'data-icfileid'
  ICNameAttr = 'data-icfilename'
  EBIdAttr = 'data-ebfileid'
  CBIdAttr = 'data-cbfileid'
  count = 0

  componentDidMount = () => {
    changeUploadBtn()
  }
  componentDidUpdate = () => {
    updateImgPrev(this)
    if (this.props.editorImage.blobUrl && this.count === 0) {
      imgPrevFromOutside(this)
    }
  }

  // specify upload params and url for your files
  getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' } // for get blob data via XHR Request
  }

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => {
    // check if image uploaded
    const pattern = /^image+/
    const isImage = pattern.test(meta.type)

    // update done fields array
    if (status === 'done') {
      if (isImage) {
        this.doneFileIds.push(meta.id)
      } else {
        this.doneFileIds.push('video-id')
      }

      // store files in redux store
      this.props.scheduleFiles.value.push(file)
      this.props.setScheduleFiles({
        value: this.props.scheduleFiles.value,
        isValid: true,
        errMsg: ''
      })
    }

    if (isImage) {
      makeEditBtn(this, status, meta)
    }

    // count uploaded file
    if (status === 'getting_upload_params') {
      this.count++
    }
    if (status === 'removed') {
      this.count--

      // remove file from redux scheduleFiles
      const value = this.props.scheduleFiles.value.filter(
        item =>
          file.name !== item.name &&
          file.lastModified !== item.lastModified &&
          file.size !== item.size
      )
      this.props.setScheduleFiles({
        value,
        isValid: true,
        errMsg: ''
      })
    }
  }

  render() {
    return (
      <div className="WallzoeFileUploader">
        <h2>Upload media files</h2>
        <Dropzone
          getUploadParams={this.getUploadParams}
          onChangeStatus={this.handleChangeStatus}
          inputWithFilesContent="Upload"
          accept="image/*, video/*"
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    currentImage: state.photoEditor.currentImage,
    editorImage: state.photoEditor.editorImage,
    scheduleFiles: state.scheduler.scheduleFiles
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentImage: image => dispatch(setCurrentImage(image)),
    setScheduleFiles: files => dispatch(setScheduleFiles(files)),
    photoEditorOpen: () => dispatch(photoEditorOpen())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FileUploader))
