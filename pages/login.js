import Head from "next/head";
import Link from "next/link";

import LoginForm from "../components/forms/loginForm";

import Container from "@material-ui/core/Container";

export default function logInPage() {
  return (
    <Container maxWidth={"xs"}>
      <Head>
        <title>Login page</title>
      </Head>
      
      <main>
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
      </main>
    </Container>
  );
}
