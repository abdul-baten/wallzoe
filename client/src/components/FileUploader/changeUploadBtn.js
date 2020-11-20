export default () => {
  const uploadBtnElm = document.querySelector('.dzu-inputLabel')
  if (uploadBtnElm) {
    uploadBtnElm.childNodes[0].nodeValue = 'Upload'
    uploadBtnElm.classList.add('dzu-inputLabelWithFiles')
    uploadBtnElm.classList.remove('dzu-inputLabel')
  }
}