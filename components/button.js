import React from "react";

import { Button as MaterialUIButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#33691e",
    margin: "16px 16px 16px 0",
  },
}));

export default function Button({ isLoading, title, children, ...buttonProps }) {
  const classes = useStyles();
  return (
    <MaterialUIButton
      variant="outlined"
      {...buttonProps}
      className={classes.btn}
    >
      {isLoading ? <CircularProgress width="20" /> : title}
      {children}
    </MaterialUIButton>
  );
}
