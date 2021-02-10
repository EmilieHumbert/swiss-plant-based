import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ResetPasswordForm() {
  const { control, register, errors, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    auth.sendPasswordResetEmail(data.email);
    router.push("/login");
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
        <span>
          <Button type="submit" variant="outlined">
            Send reset link
          </Button>
        </span>
      </div>
    </form>
  );
}
