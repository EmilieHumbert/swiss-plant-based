import React, { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import Error from "../error";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ResetPasswordForm() {
  const auth = useAuth();
  const router = useRouter();
  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await auth.sendPasswordResetEmail(data.email);
      router.push("/login");
    } catch (error) {
      setError("submit", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.email && <Error message={errors.email.message}></Error>}
      </div>
      <div>
        <span>
          <Button type="submit" variant="outlined">
            Send reset link
          </Button>
        </span>
      </div>
      {errors.submit && <Error message={errors.submit.message}></Error>}
    </form>
  );
}
