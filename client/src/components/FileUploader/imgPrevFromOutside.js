import { remove } from 'lodash'

import { createElement } from '../../helper/utils'
import changeUploadBtn from './changeUploadBtn'

export default _this => {
  const uploaderElm = document.querySelector('.dzu-dropzone')
  const imageWrapperElm = createElement('DIV', '', [
    { name: 'class', value: 'dzu-previewContainer' },
    { name: _this.ICIdAttr, value: _this.props.editorImage.id },
    { name: _this.ICNameAttr, value: _this.props.editorImage.name }
  ])
  const imgElm = createElement('IMG', '', [
    { name: 'class', value: 'dzu-previewImage' },
    { name: 'src', value: _this.props.editorImage.blobUrl },
    { name: 'alt', value: _this.props.editorImage.name },
    { name: 'title', value: _this.props.editorImage.name }
  ])
  const statusContainerElm = createElement('DIV', '', [
    { name: 'class', value: 'dzu-previewStatusContainer' }
  ])
  const removeBtnElm = createElement('SPAN', '', [
    { name: 'class', value: 'dzu-previewButton' },
    { name: _this.CBIdAttr, value: _this.props.editorImage.id },
    {
      name: 'style',
      value:
        'background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUuMCwgMC4wKSIgZmlsbD0iIzMzMzMzMyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wLCAwLjApIj48cG9seWdvbiBwb2ludHM9IjcuNzE5IDQuOTY0IDEyLjY5MiAwLjAxNyAxNC4zODkgMS43MTUgOS40MTIgNi42NjYgMTQuMzU0IDExLjYzNCAxMi42NTcgMTMuMzMxIDYuMDE3IDYuNjU3IDcuNzE1IDQuOTYwIj48L3BvbHlnb24+PHBvbHlnb24gcG9pbnRzPSI3LjYxMiA0Ljk2NCA3LjYxNiA0Ljk2MCA5LjMxMyA2LjY1NyAyLjY3NCAxMy4zMzEgMC45NzcgMTEuNjM0IDUuOTE5IDYuNjY2IDAuOTQyIDEuNzE1IDIuNjM5IDAuMDE3Ij48L3BvbHlnb24+PC9nPjwvZz48L3N2Zz4K);'
    }
  ])
  const editBtnElm = createElement('SPAN', 'Edit', [
    { name: 'class', value: 'WallzoeEditBtn' },
    { name: _this.EBIdAttr, value: _this.props.editorImage.id }
  ])
  imageWrapperElm.appendChild(imgElm)
  statusContainerElm.appendChild(removeBtnElm)
  statusContainerElm.appendChild(editBtnElm)
  imageWrapperElm.appendChild(statusContainerElm)

  if (uploaderElm) {
    uploaderElm.prepend(imageWrapperElm)
    _this.doneFileIds.push(_this.props.editorImage.id)
    _this.count++
  }

  editBtnElm.addEventListener('click', event => {
    const imageContainerElm = document.querySelector(
      `.dzu-previewContainer[${_this.ICIdAttr}="${event.target.getAttribute(
        _this.EBIdAttr
      )}"]`
    )

    _this.props.setCurrentImage({
      id: imageContainerElm.getAttribute(_this.ICIdAttr),
      name: imageContainerElm.getAttribute(_this.ICNameAttr),
      blobUrl: imageContainerElm
        .querySelector('.dzu-previewImage')
        .getAttribute('src')
    })
    _this.props.photoEditorOpen()
  })
  removeBtnElm.addEventListener('click', event => {
    const imageContainerElm = document.querySelector(
      `.dzu-previewContainer[${_this.ICIdAttr}="${event.target.getAttribute(
        _this.CBIdAttr
      )}"]`
    )
    imageContainerElm.remove()
    _this.props.setCurrentImage({
      id: null,
      name: null,
      blobUrl: null
    })
    remove(_this.doneFileIds, id => {
      return id === _this.props.editorImage.id
    })
    _this.count--
    changeUploadBtn()
  })
}
