import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";

import classes from "./MenuItems.module.scss";

const menuItems = () => {
  const allMenuItems = [
    {
      label: "Terms of Services",
      link: "https://www.walzoe.com/terms-of-service"
    },
    {
      label: "Privacy Policy",
      link: "https://www.walzoe.com/privacy-policy"
    },
    {
      label: "Help and Support",
      link: "#"
    }
  ];

  const allMenuItemsJsx = allMenuItems.map((item, index) => {
    return (
        <ListItem key={index}>
        <Link
          component="button"
          color="textPrimary"
          classes={{ root: classes.Item }}
        >
          {item.label}
        </Link>
      </ListItem>
    );
  });

  return <List>{allMenuItemsJsx}</List>;
};

export default menuItems;
