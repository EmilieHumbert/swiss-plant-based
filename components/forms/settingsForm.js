import React from "react";
import { useForm } from "react-hook-form";

import SettingsTextField from "../SettingsTextField";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: "20px",
  },
}));

export default function SettingsForm({
  cancel,
  defaultValue,
  field,
  label,
  rules,
  submit,
}) {
  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      [field]: defaultValue,
    },
  });

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(submit)} className={classes.form}>
      <Grid container>
        <Grid item xs={10}>
          <SettingsTextField
            control={control}
            field={field}
            label={label}
            rules={rules}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton type="submit">
            <DoneIcon fontSize="small" style={{ color: green[500] }} />
          </IconButton>
          <IconButton onClick={cancel}>
            <ClearIcon color="secondary" fontSize="small" />
          </IconButton>
        </Grid>
        {errors[field] && <div>{errors[field].message}</div>}
      </Grid>
    </form>
  );
}
