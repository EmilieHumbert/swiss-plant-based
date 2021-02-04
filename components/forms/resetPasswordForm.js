import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

export default function ResetPasswordForm() {
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();
  const onSubmit = (data) => {
    auth.sendPasswordResetEmail(data.email);
    router.push("/login");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email address</label>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            ref={register({
              required: "Please enter an email",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Not a valid email",
              },
            })}
          />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
      </div>
      <div>
        <span>
          <button type="submit">Send reset link</button>
        </span>
      </div>
    </form>
  );
}
