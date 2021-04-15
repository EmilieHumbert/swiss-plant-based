import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
  },
}));

export default function SavedRecipes() {
  const classes = useStyles();
  return <h1 className={classes.title}>Saved recipes</h1>;
}
