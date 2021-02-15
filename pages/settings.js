import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";

import { Box, Button, Container, Grid, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {},
  nameTitle: {
    margin: 0,
  },
  imageContainer: {
    width: "150px",
    position: "relative",
    "&:hover .edit-button": {
      display: "block",
      backgroundColor: "white",
    },
  },
  editImage: {
    display: "none",
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "white",
  },
}));

export default function Settings() {
  const auth = useRequireAuth();
  const classes = useStyles();

  return auth.loading || !auth.user ? null : (
    <Container className={classes.root} maxWidth={"md"} spacing={3}>
      <h1>My Profile</h1>
      <Grid container>
        <Grid item xs={3}>
          <Box className={classes.imageContainer}>
            <Image
              src="/images/profile_picture.jpg"
              alt="Profile picture"
              width={150}
              height={150}
            />
            <Button className={classNames("edit-button", classes.editImage)}>
              <EditIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <h1 className={classes.nameTitle}>{auth.user.name}</h1>
          <p>{auth.user.email}</p>
          <Box display="flex" flexDirection="row" alignItems="center">
            <LocationOnIcon />
            <p>the world</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
