import { createElement } from '../../../helper'

/*
   Action buttons when photo editor open from scheduler interface
*/

export default (_this, editorInstance) => {
  const actionBtnWrapperElm = document.querySelector(
    '.tui-image-editor-header-buttons'
  )

  const actionsBtnElms = actionBtnWrapperElm.children
  if (actionsBtnElms) {
    for (let i = 0; i < actionsBtnElms.length; i++) {
      actionsBtnElms[i].style.display = 'none'
    }
  }
  const backBtn = createElement('BUTTON', 'back', [
    { name: 'class', value: 'WallzoePhotoEditorBackButton' },
    { name: 'type', value: 'button' }
  ])
  const doneBtn = createElement('BUTTON', 'done', [
    {
      name: 'class',
      value: 'WallzoePhotoEditorDoneButton'
    },
    { name: 'type', value: 'button' }
  ])

  if (backBtn) {
    actionBtnWrapperElm.appendChild(backBtn)
    backBtn.addEventListener('click', () => {
      _this.props.photoEditorClose()
    })
  }

  if (doneBtn) {
    actionBtnWrapperElm.appendChild(doneBtn)
    doneBtn.addEventListener('click', () => {
      const canvasElm = document.querySelector(
        '.tui-image-editor-canvas-container .lower-canvas'
      )
      editorInstance.discardSelection()
      canvasElm.toBlob(blob => {
        const url = URL.createObjectURL(blob)
        _this.props.setCurrentImage({
          id: _this.props.currentImage.id,
          name: _this.props.currentImage.name,
          blobUrl: url
        })
        _this.props.photoEditorClose()
      })
    })
  }
}
