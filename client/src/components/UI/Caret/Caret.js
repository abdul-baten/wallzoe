import React from "react";

import FontAwesome from "../Icons/FontAwesome/FontAwesome";
import {
  faCaretDown,
  faCaretUp,
  faCaretLeft,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";

const caret = props => {
  let caretIcon = "";

  switch (props.type) {
    case "up":
      caretIcon = <FontAwesome icon={faCaretUp} />;
      break;
    case "down":
      caretIcon = <FontAwesome icon={faCaretDown} />;
      break;
    case "left":
      caretIcon = <FontAwesome icon={faCaretLeft} />;
      break;
    case "right":
      caretIcon = <FontAwesome icon={faCaretRight} />;
      break;
    default:
      caretIcon = <FontAwesome icon={faCaretDown} />;
  }

  return caretIcon;
};

export default caret;
