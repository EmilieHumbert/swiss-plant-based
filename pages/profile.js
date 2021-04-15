import React, { useState } from "react";

import { useRequireAuth } from "../hooks/useRequireAuth";
import ProfileSideMenu from "../components/profileSideMenu";
import ProfileDisplayPage from "../components/profileDisplayPage";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #bdbdbd",
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(6),
  },
  image: {
    borderRadius: "50%",
  },
  nameTitle: {
    marginBottom: 0,
  },
}));

export default function Profile() {
  const auth = useRequireAuth();
  const classes = useStyles();
  const [page, setPage] = useState("YourRecipes");
  
  return auth.loading || !auth.user ? null : (
    <Container className={classes.root} maxWidth={"md"} spacing={3}>
      <Grid container>
        <Grid item xs={3} container>
          <ProfileSideMenu setPage={setPage} />
        </Grid>
        <Grid item xs={9} container>
          <ProfileDisplayPage page={page} />
        </Grid>
      </Grid>
    </Container>
  );
}
