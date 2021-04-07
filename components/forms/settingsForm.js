import React from "react";
import { useForm } from "react-hook-form";

import SettingsTextField from "../settingsTextField";
import Error from "../error";
import PasswordConfirmationForm from "./passwordConfirmationForm";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";

import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: "20px",
  },
}));

export default function SettingsForm({
  cancel,
  defaultValue,
  errorMessage,
  field,
  isPasswordConfirmationFormOpen,
  rules,
  submit,
  type,
}) {
  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues: {
      [field]: defaultValue,
    },
  });
  const { errors } = formState;

  if (errorMessage) {
    setError(field, {
      type: "manual",
      message: errorMessage,
    });
  }

  const formId = nanoid();
  const classes = useStyles();

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className={classes.form}
        id={formId}
      >
        <Grid container>
          <Grid item xs={9}>
            <SettingsTextField
              control={control}
              field={field}
              rules={rules}
              type={type}
            />
          </Grid>
          <Grid item xs={3}>
            <IconButton type="submit">
              <DoneIcon fontSize="small" style={{ color: green[500] }} />
            </IconButton>
            <IconButton onClick={cancel}>
              <ClearIcon color="secondary" fontSize="small" />
            </IconButton>
          </Grid>
          {errors[field] && <Error message={errors[field].message} />}
        </Grid>
      </form>
      {isPasswordConfirmationFormOpen && (
        <PasswordConfirmationForm
          cancel={cancel}
          submit={() => document.getElementById(formId).submit()}
        />
      )}
    </>
  );
}
