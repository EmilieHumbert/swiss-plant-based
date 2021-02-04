import Link from "next/link";
import LoginForm from "../components/forms/loginForm";

export default function logInPage() {
  return (
    <div>
      <div>
        <h2>Log in</h2>
        <p>Don't have an account?</p>
        <Link href="/signup">
          <a href="#">Sign up</a>
        </Link>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
