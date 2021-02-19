import { useState } from "react";
import Image from "next/image";

import { useRequireAuth } from "../hooks/useRequireAuth";
import SettingsForm from "../components/forms/settingsForm";

import {
  Box,
  Container,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
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
    width: "350px",
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
    right: "55px",
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
  locationContainer: {
    width: "150px",
    position: "relative",
    "&:hover .edit-button-location": {
      display: "block",
      backgroundColor: "none",
    },
  },
  editLocation: {
    display: "none",
    position: "absolute",
    top: "-5px",
    right: "5px",
  },
}));

export default function Settings() {
  const auth = useRequireAuth();
  const classes = useStyles();

  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  return auth.loading || !auth.user ? null : (
    <Container className={classes.root} maxWidth={"md"} spacing={3}>
      <h1>My Profile</h1>
      <Grid container>
        <Grid item xs={3}>
          <Box className={classes.imageContainer}>
            <>
              <Image
                src="/images/profile_picture.jpg"
                alt="Profile picture"
                width={150}
                height={150}
              />
              <IconButton
                className={classNames("edit-button-image", classes.editImage)}
                onClick={() => {
                  setEditImage(true);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box className={classes.titleContainer}>
            {editName ? (
              <SettingsForm
                cancel={() => setEditName(false)}
                defaultValue={auth.user.name}
                field="name"
                label="Name"
                rules={{
                  required: "Please enter your name",
                }}
                submit={(data) => {
                  auth.updateUser({ data, uid: auth.user.uid });
                  setEditName(false);
                }}
              />
            ) : (
              <>
                <h1 className={classes.nameTitle}>{auth.user.name}</h1>
                <IconButton
                  className={classNames("edit-button-title", classes.editTitle)}
                  onClick={() => setEditName(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          <Box className={classes.emailContainer}>
            {editEmail ? (
              <SettingsForm
                cancel={() => setEditEmail(false)}
                defaultValue={auth.user.email}
                field="email"
                label="Email"
                rules={{
                  required: "Please enter your email",
                }}
                submit={(data) => {
                  auth.updateUser({ data, uid: auth.user.uid });
                  setEditEmail(false);
                }}
              />
            ) : (
              <>
                <p>{auth.user.email}</p>
                <IconButton
                  className={classNames("edit-button-email", classes.editTitle)}
                  onClick={() => setEditEmail(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          <Box
            className={classes.locationContainer}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            {editLocation ? (
              <SettingsForm
                cancel={() => setEditLocation(false)}
                defaultValue={auth.user.location}
                field="location"
                label="Location"
                rules={{
                  required: "Please enter your location",
                }}
                submit={(data) => {
                  auth.updateUser({ data, uid: auth.user.uid });
                  setEditLocation(false);
                }}
              />
            ) : (
              <>
                <LocationOnIcon fontSize="small" />
                <p>{auth.user.location}</p>
                <IconButton
                  className={classNames(
                    "edit-button-location",
                    classes.editLocation
                  )}
                  onClick={() => setEditLocation(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
