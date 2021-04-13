import React, { useState } from "react";

import { useRequireAuth } from "../hooks/useRequireAuth";
import SettingsForm from "../components/forms/settingsForm";
import ImageForm from "../components/forms/imageForm";
import Error from "../components/error";

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
    width: "150px",
  },
  inputContainer: {
    fontSize: "20px",
    lineHeight: "24px",
    position: "relative",
    "&:hover .edit-button-title": {
      backgroundColor: "none",
      display: "block",
    },
    "&:hover .edit-button-email": {
      backgroundColor: "none",
      display: "block",
    },
    "&:hover .edit-button-password": {
      backgroundColor: "none",
      display: "block",
    },
    "&:hover .edit-button-location": {
      backgroundColor: "none",
      display: "block",
    },
  },
  inputBox: {
    marginBottom: "20px",
    padding: "18.5px 14px",
  },
  editInputBox: {
    position: "absolute",
    right: "0",
    top: "0",
  },
}));

export default function Settings() {
  const auth = useRequireAuth();
  const classes = useStyles();

  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [errorMessageName, setErrorMessageName] = useState(null);
  const [errorMessageEmail, setErrorMessageEmail] = useState(null);
  const [errorMessageLocation, setErrorMessageLocation] = useState(null);
  const [errorMessagePassword, setErrorMessagePassword] = useState(null);

  const [submitError, setSubmitError] = useState(null);

  const [
    isPasswordConfirmationFormOpen,
    setIsPasswordConfirmationFormOpen,
  ] = useState(false);

  const onSubmit = (auth, setEdit, setError) => async (data) => {
    try {
      await auth.updateUser({ data, uid: auth.user.uid });
      setEdit(false);
      setIsPasswordConfirmationFormOpen(false);
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setIsPasswordConfirmationFormOpen(true);
      }
      setSubmitError(err.message);
    }
  };

  const onCancel = (setEdit) => () => {
    setEdit(false);
    setIsPasswordConfirmationFormOpen(false);
  };

  return auth.loading || !auth.user ? null : (
    <Container className={classes.root} maxWidth={"md"} spacing={3}>
      <h1 data-cy-settings-title>Settings</h1>
      <Grid container>
        <Grid item xs={3}>
          <Box className={classes.imageContainer} data-cy-image>
            <ImageForm />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.description}>Name</div>
          <div className={classes.description}>Email</div>
          <div className={classes.description}>Password</div>
          <div className={classes.description}>Location</div>
        </Grid>
        <Grid item xs={7}>
          <Box className={classes.inputContainer}>
            {editName ? (
              <SettingsForm
                cancel={onCancel(setEditName)}
                defaultValue={auth.user.name}
                errorMessage={errorMessageName}
                field="name"
                rules={{
                  required: "Please enter your name",
                  maxLength: {
                    value: 50,
                    message: "Name should NOT have more than 50 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Name should be more than 3 characters",
                  },
                }}
                submit={onSubmit(auth, setEditName, setErrorMessageName)}
                type="text"
              />
            ) : (
              <>
                <div data-cy-name className={classes.inputBox}>
                  {auth.user.name}
                </div>
                <IconButton
                  data-cy-name-editbutton
                  className={classNames(
                    "edit-button-title",
                    classes.editInputBox
                  )}
                  onClick={() => setEditName(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          <Box className={classes.inputContainer}>
            {editEmail ? (
              <SettingsForm
                cancel={onCancel(setEditEmail)}
                defaultValue={auth.user.email}
                errorMessage={errorMessageEmail}
                field="email"
                isPasswordConfirmationFormOpen={isPasswordConfirmationFormOpen}
                rules={{
                  required: "Please enter your email",
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Not a valid email",
                  },
                }}
                submit={onSubmit(auth, setEditEmail, setErrorMessageEmail)}
                type="email"
              />
            ) : (
              <>
                <div data-cy-email className={classes.inputBox}>
                  {auth.user.email}
                </div>
                <IconButton
                  data-cy-email-editbutton
                  className={classNames(
                    "edit-button-email",
                    classes.editInputBox
                  )}
                  onClick={() => setEditEmail(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          <Box className={classes.inputContainer}>
            {editPassword ? (
              <SettingsForm
                cancel={onCancel(setEditPassword)}
                defaultValue=""
                errorMessage={errorMessagePassword}
                field="password"
                isPasswordConfirmationFormOpen={isPasswordConfirmationFormOpen}
                rules={{
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "Should have at least 6 characters",
                  },
                }}
                submit={onSubmit(
                  auth,
                  setEditPassword,
                  setErrorMessagePassword
                )}
                type="password"
              />
            ) : (
              <>
                <div data-cy-password className={classes.inputBox}>
                  ••••••
                </div>
                <IconButton
                  data-cy-password-editbutton
                  className={classNames(
                    "edit-button-password",
                    classes.editInputBox
                  )}
                  onClick={() => setEditPassword(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          {editLocation ? (
            <Box className={classes.inputContainer}>
              <SettingsForm
                cancel={onCancel(setEditLocation)}
                defaultValue={auth.user.location}
                errorMessage={errorMessageLocation}
                field="location"
                rules={{
                  required: "Please enter your location",
                  maxLength: {
                    value: 100,
                    message:
                      "Location should NOT have more than 100 characters",
                  },
                }}
                submit={onSubmit(
                  auth,
                  setEditLocation,
                  setErrorMessageLocation
                )}
                type="text"
              />
            </Box>
          ) : (
            <Box className={classes.inputContainer}>
              <div data-cy-location className={classes.inputBox}>
                {auth.user.location}
              </div>
              <IconButton
                data-cy-location-editbutton
                className={classNames(
                  "edit-button-location",
                  classes.editInputBox
                )}
                onClick={() => setEditLocation(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {submitError && <Error message={submitError} />}
        </Grid>
      </Grid>
    </Container>
  );
}
