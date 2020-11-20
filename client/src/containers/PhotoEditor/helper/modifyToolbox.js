/*
   Toolbox modification of the tui photo editor
*/

export default () => {
  // hide separator from toolbox
  const separatorElms = document.querySelectorAll(
    '.tui-image-editor-icpartition'
  )
  if (separatorElms) {
    for (let i = 0; i < separatorElms.length; i++) {
      separatorElms[i].parentElement.style.display = 'none'
    }
  }

  // grouping the toolbox
  const deleteAllBtnElm = document.getElementById('tie-btn-delete-all')
  if (deleteAllBtnElm) {
    deleteAllBtnElm.insertAdjacentHTML(
      'afterend',
      '<div class="PhotoEdito_toolbox-seperator"></div>'
    )
  }
}
