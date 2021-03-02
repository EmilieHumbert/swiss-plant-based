import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    backgroundColor: "#F8D7DA",
    borderRadius: "15px",
    color: "A14D55",
    marginTop: "16px",
    padding: "16px",
  },
}));

export default function Error({ message }) {
  const classes = useStyles();
  return <div className={classes.errorMessage}>{message}</div>;
}
