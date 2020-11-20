import React from "react";

import classes from "./Logo.module.scss";
import logoImg from "../../media/logo.png";

const logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={props.src ? props.src : logoImg} alt={props.alt} />
    </div>
  );
};

export default logo;
