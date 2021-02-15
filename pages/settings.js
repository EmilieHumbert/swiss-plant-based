import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";

import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
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
    "&:hover .edit-button-image": {
      display: "block",
      backgroundColor: "white",
    },
  },
  editImage: {
    display: "none",
    position: "absolute",
    top: "-10px",
    right: "-5px",
  },
  titleContainer: {
    width: "300px",
    position: "relative",
    "&:hover .edit-button-title": {
      display: "block",
      backgroundColor: "none",
    },
  },
  editTitle: {
    display: "none",
    position: "absolute",
    top: "-10px",
    right: "15px",
  },
  emailContainer: {
    width: "300px",
    position: "relative",
    "&:hover .edit-button-email": {
      display: "block",
      backgroundColor: "none",
    },
  },
  editEmail: {
    display: "none",
    position: "absolute",
    top: "-20px",
    right: "30px",
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
            <IconButton
              className={classNames("edit-button-image", classes.editImage)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box className={classes.titleContainer}>
            <h1 className={classes.nameTitle}>{auth.user.name}</h1>
            <IconButton
              className={classNames("edit-button-title", classes.editTitle)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box className={classes.emailContainer}>
            <p>{auth.user.email}</p>
            <IconButton
              className={classNames("edit-button-email", classes.editEmail)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <LocationOnIcon />
            <p>the world</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
