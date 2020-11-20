export const createElement = (nodeName, text, attrs = []) => {
  const nodeElm = document.createElement(nodeName)
  const textContent = document.createTextNode(text)

  if (Array.isArray(attrs) && attrs.length) {
    attrs.forEach(attr => {
      const attrName = document.createAttribute(attr.name)
      attrName.value = attr.value
      nodeElm.setAttributeNode(attrName)
    })
  }
  if (textContent) {
    nodeElm.appendChild(textContent)
  }

  return nodeElm
}
