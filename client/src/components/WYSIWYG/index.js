import React from "react";

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/js/plugins/colors.min.js'
import 'froala-editor/css/plugins/colors.min.css'
import 'froala-editor/js/plugins/font_size.min.js'
import 'froala-editor/js/plugins/file.min.js'
import 'froala-editor/css/plugins/file.min.css'
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/css/plugins/image.min.css'
import 'froala-editor/js/plugins/image_manager.min.js'
import 'froala-editor/css/plugins/image_manager.min.css'
import 'froala-editor/js/plugins/quote.min.js'
import 'froala-editor/js/plugins/link.min.js'

import FroalaEditor from 'react-froala-wysiwyg'

const config={
  placeholderText: 'Add extra details or attach a file...',
  charCounterCount: false
}

const WysiwygEditor = props => {
  return (
    <FroalaEditor
      tag='textarea'
      config={config}
      model={props.model}
      onModelChange={props.onModelChange}
    />
  );
};

export default WysiwygEditor;