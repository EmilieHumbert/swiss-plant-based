import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useAuth } from "../../hooks/useAuth";
import Error from "../error";
import Button from "../button";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(2),
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
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      router.push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found": {
          setError("email", {
            type: "manual",
            message: error.message,
          });
          break;
        }
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
        {errors.name && <Error message={errors.name.message} />}
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
        {errors.email && <Error message={errors.email.message} />}
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
        {errors.password && <Error message={errors.password.message} />}
      </div>
      <div>
        <span>
          <Button title="Sign up" type="submit" variant="outlined" />
        </span>
      </div>
      {submitError && <Error message={submitError} />}
    </form>
  );
}
