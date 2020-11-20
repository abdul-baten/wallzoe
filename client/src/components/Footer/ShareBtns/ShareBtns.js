import React from "react";

import Fab from "@material-ui/core/Fab";

import {FAIcon} from "../../UI/";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";

import classes from "./ShareBtns.module.scss";

const shareBtns = () => {
  const allShareBtns = [
    {
      label: "Facebook",
      icon: <FAIcon icon={faFacebookF} />,
      link: "#"
    },
    {
      label: "Twitter",
      icon: <FAIcon icon={faTwitter} />,
      link: "#"
    }
  ];
  const allShareBtnsJsx = allShareBtns.map(item => {
    return (
      <Fab size="small" key={item.label} classes={{root: classes.Item}}>
        {item.icon}
      </Fab>
    );
  });
  return <div className={classes.ShareBtns}>{allShareBtnsJsx}</div>;
};

export default shareBtns;
