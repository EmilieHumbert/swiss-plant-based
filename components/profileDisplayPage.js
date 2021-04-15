import React from "react";

import YourRecipes from "./yourRecipes";
import SavedRecipes from "./savedRecipes";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
}));
export default function ProfileDisplayPage({ page }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {page === "YourRecipes" ? <YourRecipes /> : <SavedRecipes />}
    </div>
  );
}
