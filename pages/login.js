import Link from "next/link";
import LoginForm from "../components/forms/loginForm";

import "fontsource-roboto";
import Container from "@material-ui/core/Container";

export default function logInPage() {
  return (
    <Container maxWidth="sm">
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
    </Container>
  );
}
