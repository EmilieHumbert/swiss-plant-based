import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { useRequireAuth } from "../hooks/useRequireAuth";
import { db } from "../config/fire.config";

import {
  Box,
  Container,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

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
  const [editTitle, setEditTitle] = useState(false);
  const [name, setName] = useState("");
  const { handleSubmit, setValue } = useForm();

  const onSubmit = (data, e) => {
    db.collection("users").doc(auth.user.uid).update({ name: name });
    setEditTitle(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

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
            {editTitle ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  name="name"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                />
                <IconButton type="submit">
                  <DoneIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditTitle(false);
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </form>
            ) : (
              <>
                <h1 className={classes.nameTitle}>{auth.user.name}</h1>
                <IconButton
                  className={classNames("edit-button-title", classes.editTitle)}
                  onClick={() => {
                    setEditTitle(true);
                    console.log(editTitle);
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          <Box className={classes.emailContainer}>
            <p>{auth.user.email}</p>
            <IconButton
              className={classNames("edit-button-email", classes.editEmail)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            className={classes.locationContainer}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <LocationOnIcon fontSize="small" />
            <p>the world</p>
            <IconButton
              className={classNames(
                "edit-button-location",
                classes.editLocation
              )}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
