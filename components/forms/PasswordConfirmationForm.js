import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { auth, credential } from "../../config/fire.config";
import Button from "../button";
import Error from "../error";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PasswordConfirmationForm({ cancel, submit }) {
  const [submitError, setSubmitError] = useState(null);

  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    const credentials = credential(auth.currentUser.email, data.password);
    try {
      await auth.currentUser.reauthenticateWithCredential(credentials);
      await submit();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password": {
          setError("password", {
            type: "manual",
            message: error.message,
          });
          break;
        }
        default: {
          setSubmitError(error.message);
        }
      }
    }
  };

  return (
    <Dialog open={true} onClose={cancel} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Confirm your password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password in order to change your email address.
          </DialogContentText>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Should have at least 6 characters",
              },
            }}
            render={(props) => (
              <TextField
                fullWidth
                label="Password"
                type="password"
                required
                variant="outlined"
                value={props.value}
                onChange={props.onChange}
                inputRef={props.ref}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
      {errors.password && <Error message={errors.password.message} />}
      {submitError && <Error message={submitError} />}
    </Dialog>
  );
}
