import React from "react";
import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";
import { DEFAULT_PROFILE_IMAGE } from "../config/constants";

import { makeStyles } from "@material-ui/core/styles";
import { MenuList, MenuItem, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  image: {
    borderRadius: "50%",
    margin: "auto",
  },
  location: {
    fontSize: "14px",
    padding: "6px 16px",
  },
  menuItemsSavedRecipes: {
    borderTop: "solid 1px #bdbdbd",
    borderBottom: "solid 1px #bdbdbd",
    paddingLeft: "10px",
  },
  menuItemsRecipes: {
    borderTop: "solid 1px #bdbdbd",
    paddingLeft: "10px",
  },
  nameTitle: {
    fontSize: "16px",
    marginBottom: "16px",
    marginTop: 0,
    padding: "6px 16px",
    textAlign: "center",
  },
  paper: {
    padding: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ProfileSideMenu({ setPage }) {
  const auth = useRequireAuth();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Image
          data-cy-profile-image
          src={auth.user.profileImage || DEFAULT_PROFILE_IMAGE}
          alt="Profile picture"
          className={classes.image}
          width={150}
          height={150}
        />
        <h1 data-cy-profile-title className={classes.nameTitle}>
          {auth.user.name}
        </h1>
        <MenuList>
          <MenuItem
            className={classes.menuItemsRecipes}
            onClick={() => setPage("YourRecipes")}
          >
            Your recipes
          </MenuItem>
          <MenuItem
            className={classes.menuItemsSavedRecipes}
            onClick={() => setPage("SavedRecipes")}
          >
            Saved recipes
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
