import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";

import { storage } from "../../config/fire.config";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Error from "../error";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const DEFAULT_PROFILE_IMAGE = "/images/profile_picture.jpg";

export default function ImageForm() {
  const auth = useRequireAuth();
  const [editImage, setEditImage] = useState(false);
  const [srcImage, setSrcImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [submitError, setSubmitError] = useState(null);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    const profileImage = auth.user?.profileImage || DEFAULT_PROFILE_IMAGE;
    setSrcImage(profileImage);
  }, [auth.user?.profileImage]);

  const onSubmit = (data) => {
    console.log(data);
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`images/profile/${auth.user.uid}`);
    setEditImage(false);
    const uploadTask = fileRef.put(data.picture[0]);

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
      {editImage ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} type="file" name="picture" />
          <button>Upload file</button>
          {submitError && <Error message={submitError} />}
        </form>
      ) : (
        <>
          <Image
            src={srcImage}
            alt="Profile picture"
            width={150}
            height={150}
          />
          <IconButton
            onClick={() => {
              setEditImage(true);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </div>
  );
}
