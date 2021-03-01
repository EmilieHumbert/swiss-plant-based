import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useAuth } from "../../hooks/useAuth";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#eeeeee",
  },
  errorMessage: {
    color: "red",
    textTransform: "uppercase",
  },
}));

export default function SignUpForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      router.push("/");
    } catch (error) {
      setError("submit", {
        type: "manual",
        message: error.message
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="name"
          control={control}
          rules={{
            minLength: {
              value: 3,
              message: "Longer name!",
            },
            required: "Please enter your name",
          }}
          render={(props) => (
            <TextField
              className={classes.input}
              fullWidth
              label="Name"
              name="name"
              type="text"
              required
              variant="outlined"
              value={props.value}
              onChange={props.onChange}
              inputRef={props.ref}
            />
          )}
        />
        {errors.name && <div>{errors.name.message}</div>}
      </div>
      <div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Please enter an email",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Not a valid email",
            },
          }}
          render={(props) => (
            <TextField
              className={classes.input}
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              variant="outlined"
              value={props.value}
              onChange={props.onChange}
              inputRef={props.ref}
            />
          )}
        />
        {errors.email && <div>{errors.email.message}</div>}
      </div>
      <div>
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
              className={classes.input}
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              variant="outlined"
              value={props.value}
              onChange={props.onChange}
              inputRef={props.ref}
            />
          )}
        />
        {errors.password && <div>{errors.password.message}</div>}
      </div>
      <div>
        <span>
          <Button className={classes.button} type="submit" variant="outlined">
            Sign up
          </Button>
        </span>
      </div>
      {errors.submit && (
        <div className={classes.errorMessage}>{errors.submit.message}</div>
      )}
    </form>
  );
}
