import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    backgroundColor: "#F8D7DA",
    borderRadius: "4px",
    border:'#D86363 solid 1px',
    color: "#A14D55",
    marginTop: "16px",
    padding: "16px",
  },
}));

export default function Error({ message }) {
  const classes = useStyles();
  return <div className={classes.errorMessage}>{message}</div>;
}
