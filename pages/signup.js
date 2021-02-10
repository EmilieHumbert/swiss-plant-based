import Link from "next/link";
import SignUpForm from "../components/forms/signUpForm";

import Container from "@material-ui/core/Container";

export default function signUpPage() {
  return (
    <Container maxWidth={"xs"}>
      <h2>Sign up</h2>
      <p>
        Already have an account?
        <Link href="/login">
          <a href="#">Log In</a>
        </Link>
      </p>
      <SignUpForm />
    </Container>
  );
}
