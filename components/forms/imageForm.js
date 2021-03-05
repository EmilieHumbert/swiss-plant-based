import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";

import { storage } from "../../config/fire.config";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Error from "../error";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const DEFAULT_PROFILE_IMAGE = "/images/profile_picture.jpg";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  imageContainer: {
    position: "relative",
    width: "150px",
    "&:hover .edit-button-image": {
      backgroundColor: "white",
      display: "block",
    },
  },
  editButton: {
    position: "relative",
    right: "-5px",
    top: "-100px",
    pointerEvents: "none",
  },
}));

export default function ImageForm() {
  const auth = useRequireAuth();
  const classes = useStyles();
  const [srcImage, setSrcImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [submitError, setSubmitError] = useState(null);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    const profileImage = auth.user?.profileImage || DEFAULT_PROFILE_IMAGE;
    setSrcImage(profileImage);
  }, [auth.user?.profileImage]);

  const onSubmit = (data) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`images/profile/${auth.user.uid}`);
    const uploadTask = fileRef.put(data.image[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setSubmitError(error.message);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          auth.updateUser({
            data: { profileImage: downloadURL },
            uid: auth.user.uid,
          });
        });
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="profile-image">
          <Image src={srcImage} alt="Profile image" width={150} height={150} />
          <input
            id="profile-image"
            className={classes.input}
            ref={register}
            type="file"
            name="image"
            onChange={handleSubmit(onSubmit)}
          />
          <IconButton className={classes.editButton}>
            <EditIcon />
          </IconButton>
        </label>
        {submitError && <Error message={submitError} />}
      </form>
    </div>
  );
}
