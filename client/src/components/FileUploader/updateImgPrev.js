export default _this => {
  const imageContainerElm = document.querySelector(
    `.dzu-previewContainer[${_this.ICIdAttr}="${_this.props.currentImage.id}"]`
  )
  if (imageContainerElm) {
    const uploadedImageElm = imageContainerElm.querySelector(
      '.dzu-previewImage'
    )
    if (uploadedImageElm) {
      if (uploadedImageElm !== _this.props.currentImage.blobUrl) {
        uploadedImageElm.setAttribute('src', _this.props.currentImage.blobUrl)
      }
    }
  }
}
