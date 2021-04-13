import React from "react";
import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";
import { DEFAULT_PROFILE_IMAGE } from "../config/constants";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Container, Grid } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #bdbdbd",
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    marginTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(6),
  },
  image: {
    borderRadius: "50%",
  },
  nameTitle: {
    marginBottom: 0,
  },
  yourRecipes: { marginTop: theme.spacing(6) },
  savedRecipes: { marginTop: theme.spacing(6) },
}));

export default function Profile() {
  const auth = useRequireAuth();
  const classes = useStyles();

  return auth.loading || !auth.user ? null : (
    <Container className={classes.root} maxWidth={"md"} spacing={3}>
      <Grid container>
        <Grid item xs={3}>
          <Image
            data-cy-profile-image
            src={auth.user.profileImage || DEFAULT_PROFILE_IMAGE}
            alt="Profile picture"
            className={classes.image}
            width={150}
            height={150}
          />
        </Grid>
        <Grid item xs={9}>
          <h1 data-cy-profile-title className={classes.nameTitle}>
            {auth.user.name}
          </h1>
          {auth.user.location && (
            <Box display="flex" flexDirection="row" alignItems="center">
              <LocationOnIcon />
              <p>{auth.user.location}</p>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} className={classes.yourRecipes}>
          <h2 data-cy-profile-yourrecipes-title>
            Your recipes
            <Button>
              <AddCircleOutlineIcon />
            </Button>
          </h2>

          {/* add list of recipes created by user */}
        </Grid>
        <Grid item xs={12}>
          <h2 data-cy-profile-savedrecipes-title>Saved recipes</h2>
          {/* add list of recipes saved by user */}
        </Grid>
      </Grid>
    </Container>
  );
}
