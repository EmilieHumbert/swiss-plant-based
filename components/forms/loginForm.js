import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    return auth.signIn(data).then(() => {
      router.push("/dashboard");
    });
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
        <label htmlFor="password">Password</label>
        <div>
          <input
            id="password"
            type="password"
            name="password"
            ref={register({
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Should have at least 6 characters",
              },
            })}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
      </div>
      <div>
        <span>
          <button type="submit">Log in</button>
        </span>
      </div>
      <div>
        <Link href="/reset-password">
          <a href="#">Forgot your password?</a>
        </Link>
      </div>
    </form>
  );
}
