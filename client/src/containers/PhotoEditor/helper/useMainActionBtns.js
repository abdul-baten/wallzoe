import { createElement } from '../../../helper'
import { HOME_URL, SCHEDULER_URL } from '../../../config'

/*
   Actions buttons for main photo editor url
*/

export default (_this, editorInstance) => {
  const actionBtnWrapperElm = document.querySelector(
    '.tui-image-editor-header-buttons'
  )

  const downloadBtnElm = document.querySelector(
    '.tui-image-editor-header-buttons .tui-image-editor-download-btn'
  )
  const loadBtnParentElm = document.querySelector(
    '.tui-image-editor-header-buttons .tui-image-editor-load-btn'
  ).parentElement
  loadBtnParentElm.childNodes[0].nodeValue = 'Upload'
  loadBtnParentElm.classList.add('load_button_wrapper')

  const cancelBtnElm = createElement('BUTTON', 'cancel', [
    { name: 'class', value: 'WallzoePhotoEditorCancelButton' },
    { name: 'type', value: 'button' }
  ])
  const shareLabel = createElement('SPAN', 'Share on', [
    { name: 'class', value: 'WallzoePhotoEditorShareLabel' }
  ])
  const facebookPageShareBtnElm = createElement('BUTTON', 'Facebook', [
    { name: 'class', value: 'WallzoePhotoEditorFacebookShareButton' },
    { name: 'type', value: 'button' }
  ])

  downloadBtnElm.style.display = 'none'

  if (cancelBtnElm) {
    actionBtnWrapperElm.prepend(cancelBtnElm)
    cancelBtnElm.addEventListener('click', () => {
      _this.props.history.push(HOME_URL)
      _this.props.photoEditorClose()
    })
  }

  actionBtnWrapperElm.append(shareLabel)

  if (facebookPageShareBtnElm) {
    actionBtnWrapperElm.append(facebookPageShareBtnElm)
    facebookPageShareBtnElm.addEventListener('click', () => {
      const canvasElm = document.querySelector(
        '.tui-image-editor-canvas-container .lower-canvas'
      )
      const hasImg = canvasElm.style.maxWidth
      if (hasImg) {
        editorInstance.discardSelection()
        canvasElm.toBlob(blob => {
          const url = URL.createObjectURL(blob)
          const randomId =
            new Date().getTime() + Math.floor(Math.random() * 100) + '-0'

          _this.props.setEditorImage({
            id: randomId,
            name: `edited-${randomId}`,
            blobUrl: url
          })
          const imgFile = new File([blob], `edited-${randomId}`, {
            type: blob.type
          })
          _this.props.setScheduleFiles({
            value: [imgFile],
            isValid: true,
            errMsg: ''
          })
        })

        _this.props.setScheduleFor({
          value: 'facebook-page',
          isValid: true,
          errMsg: ''
        })
        _this.props.setScheduleAt({
          value: Date.now(),
          isValid: true,
          errMsg: ''
        })
        _this.props.selectedSMAccount()
        _this.props.addPostDialogOpen()
        _this.props.photoEditorClose()
        _this.props.history.push(SCHEDULER_URL)
      }
    })
  }
}
