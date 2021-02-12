import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Profile() {
  const auth = useRequireAuth();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Image
            src="/images/profile_picture.jpg"
            alt="Profile picture"
            width={150}
            height={150}
          />
        </Grid>
        <Grid item xs={6}>
          <h1>{auth.user.name}</h1>
        </Grid>
        <Grid item xs={12}>
          <h2>Your recipes</h2>
          <Button>ADD</Button>
          {/* add list of recipes created by user */}
        </Grid>
        <Grid item xs={12}>
          <h2>Saved recipes</h2>
          {/* add list of recipes saved by user*/}
        </Grid>
      </Grid>
    </div>
  );
}
