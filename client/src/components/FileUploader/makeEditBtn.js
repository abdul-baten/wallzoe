import { remove } from 'lodash'

import { createElement } from '../../helper/utils'
import changeUploadBtn from './changeUploadBtn'

export default (_this, status, meta) => {
  const imageContainerElms = document.querySelectorAll('.dzu-previewContainer')

  // decrement this.
  if (status === 'removed') {
    remove(_this.doneFileIds, id => {
      return id === meta.id
    })

    setTimeout(() => {
      changeUploadBtn()
    }, 100)
  }

  if (status === 'getting_upload_params') {
    if (imageContainerElms && imageContainerElms.length > 0) {
      if (!imageContainerElms[_this.count].getAttribute(_this.ICIdAttr)) {
        imageContainerElms[_this.count].setAttribute(_this.ICIdAttr, meta.id)

        imageContainerElms[_this.count].setAttribute(
          _this.ICNameAttr,
          meta.name
        )
      }
    }
  }

  if (status === 'done') {
    const editBtnElm = createElement('SPAN', 'Edit', [
      { name: 'class', value: 'WallzoeEditBtn' }
    ])

    if (imageContainerElms.length === _this.doneFileIds.length) {
      for (let i = 0; i < imageContainerElms.length; i++) {
        if (_this.doneFileIds[i] === 'video-id') continue

        const statusElm = imageContainerElms[i].querySelector(
          '.dzu-previewStatusContainer'
        )
        if (!statusElm.querySelector('.WallzoeEditBtn')) {
          const clonedEditBtnElm = editBtnElm.cloneNode(true)

          clonedEditBtnElm.setAttribute(
            _this.EBIdAttr,
            imageContainerElms[i].getAttribute(_this.ICIdAttr)
          )

          statusElm.appendChild(clonedEditBtnElm)

          clonedEditBtnElm.addEventListener('click', event => {
            const imageContainerElm = document.querySelector(
              `.dzu-previewContainer[${
                _this.ICIdAttr
              }="${event.target.getAttribute(_this.EBIdAttr)}"]`
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
        }
      }
    }
  }
}
