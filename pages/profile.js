import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #dcedc8",
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
  },
  image: {
    borderRadius: "50%",
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
        <Grid item xs={6}>
          <Image
            src="/images/profile_picture.jpg"
            alt="Profile picture"
            className={classes.image}
            width={150}
            height={150}
          />
        </Grid>
        <Grid item xs={6}>
          <h1>{auth.user.name}</h1>
        </Grid>
        <Grid item xs={12} className={classes.yourRecipes}>
          <h2>Your recipes</h2>
          <Button>ADD</Button>
          {/* add list of recipes created by user */}
        </Grid>
        <Grid item xs={12} className={classes.savedRecipes}>
          <h2>Saved recipes</h2>
          {/* add list of recipes saved by user*/}
        </Grid>
      </Grid>
    </Container>
  );
}
