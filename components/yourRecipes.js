import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
  },
}));

export default function YourRecipes() {
  const classes = useStyles();
  return <h1 className={classes.title}>Your recipes</h1>;
}
