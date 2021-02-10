import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../hooks/useAuth";
import Button from "../button";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { control, register, errors, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    setIsLoading(true);
    setError(null);
    return auth.signIn(data).then((response) => {
      setIsLoading(false);
      response.error ? setError(response.error) : router.push("/dashboard");
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div>
          <span>{error.message}</span>
        </div>
      )}
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
              // id="email"
              label="Email"
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
              // id="password"
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
        {errors.password && <div>{errors.password.message}</div>}
      </div>
      <div>
        <span>
          <Button
            className={classes.button}
            title="Login"
            type="submit"
            isLoading={isLoading}
          />
        </span>
      </div>
      <div>
        <Link href="/resetPassword">
          <a href="#">Forgot your password?</a>
        </Link>
      </div>
    </form>
  );
}
