import React, { useState } from "react";

import { useRequireAuth } from "../hooks/useRequireAuth";
import SettingsForm from "../components/forms/settingsForm";
import ImageForm from "../components/forms/imageForm";

import {
  Box,
  Container,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  description: {
    color: "grey",
    fontWeight: "bold",
    marginBottom: "20px",
    padding: "18.5px 14px",
    textTransform: "uppercase",
  },
  imageContainer: {
    position: "relative",
    width: "150px",
    "&:hover .edit-button-image": {
      backgroundColor: "white",
      display: "block",
    },
  },
  editImage: {
    display: "none",
    position: "absolute",
    right: "-5px",
    top: "-10px",
  },
  titleContainer: {
    fontSize: "20px",
    lineHeight: "24px",
    position: "relative",
    "&:hover .edit-button-title": {
      backgroundColor: "none",
      display: "block",
    },
  },
  name: {
    marginBottom: "20px",
    padding: "18.5px 14px",
  },
  editTitle: {
    display: "none",
    position: "absolute",
    right: "0",
    top: "0",
  },
  emailContainer: {
    fontSize: "20px",
    lineHeight: "24px",
    position: "relative",
    "&:hover .edit-button-email": {
      backgroundColor: "none",
      display: "block",
    },
  },
  email: {
    marginBottom: "20px",
    padding: "18.5px 14px",
  },
  editEmail: {
    display: "none",
    position: "absolute",
    right: "0",
    top: "0",
  },
  locationContainer: {
    fontSize: "20px",
    lineHeight: "24px",
    position: "relative",
    "&:hover .edit-button-location": {
      backgroundColor: "none",
      display: "block",
    },
  },
  location: {
    marginBottom: "20px",
    padding: "18.5px 14px",
  },
  editLocation: {
    display: "none",
    position: "absolute",
    top: "0",
    right: "0",
  },
}));

const onSubmit = (auth, setEdit, setError) => async (data) => {
  try {
    await auth.updateUser({ data, uid: auth.user.uid });
    setEdit(false);
  } catch (err) {
    console.log(err);
    setError(err);
  }
};

export default function Settings() {
  const auth = useRequireAuth();
  const classes = useStyles();

  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const [errorMessageName, setErrorMessageName] = useState(null);
  const [errorMessageEmail, setErrorMessageEmail] = useState(null);
  const [errorMessageLocation, setErrorMessageLocation] = useState(null);

  return auth.loading || !auth.user ? null : (
    <Container className={classes.root} maxWidth={"md"} spacing={3}>
      <h1>My Profile</h1>
      <Grid container>
        <Grid item xs={3}>
          <Box className={classes.imageContainer}>
            <ImageForm />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.description}>Name</div>
          <div className={classes.description}>Email</div>
          <div className={classes.description}>Location</div>
        </Grid>
        <Grid item xs={7}>
          <Box className={classes.titleContainer}>
            {editName ? (
              <SettingsForm
                cancel={() => setEditName(false)}
                defaultValue={auth.user.name}
                errorMessage={errorMessageName}
                field="name"
                rules={{
                  required: "Please enter your name",
                }}
                submit={onSubmit(auth, setEditName, setErrorMessageName)}
              />
            ) : (
              <>
                <div className={classes.name}>{auth.user.name}</div>
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
                errorMessage={errorMessageEmail}
                field="email"
                rules={{
                  required: "Please enter your email",
                }}
                submit={onSubmit(auth, setEditEmail, setErrorMessageEmail)}
                // when email changed, make sure it change authentication email as well
              />
            ) : (
              <>
                <div className={classes.email}>{auth.user.email}</div>
                <IconButton
                  className={classNames("edit-button-email", classes.editTitle)}
                  onClick={() => setEditEmail(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          {/* add password */}
          {editLocation ? (
            <Box className={classes.locationContainer}>
              <SettingsForm
                cancel={() => setEditLocation(false)}
                defaultValue={auth.user.location}
                errorMessage={errorMessageLocation}
                field="location"
                rules={{
                  required: "Please enter your location",
                }}
                submit={onSubmit(
                  auth,
                  setEditLocation,
                  setErrorMessageLocation
                )}
              />
            </Box>
          ) : (
            <Box className={classes.locationContainer}>
              <div className={classes.location}>{auth.user.location}</div>
              <IconButton
                className={classNames(
                  "edit-button-location",
                  classes.editLocation
                )}
                onClick={() => setEditLocation(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
