import { useForm } from "react-hook-form";
import { auth, db } from "../config/fire.config";

export default function SignUpForm() {
  const { register, errors, handleSubmit } = useForm();

  const createUser = (user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        createUser({ uid: response.user.uid, email, name });
        console.log(response);
      })
      .catch((error) => {
        return { error };
      });
  };

  const onSubmit = (data) => {
    return signUp(data).then((user) => {
      console.log(user);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          ref={register({ required: "Please enter an name" })}
        />
        {errors.password && <div>{errors.password.message}</div>}
      </div>
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
          <button type="submit">Sign up</button>
        </span>
      </div>
    </form>
  );
}
