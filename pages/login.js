import React from "react";

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
          <h2 data-cy-title>Log in</h2>
          <p>
            Don&apos;t have an account?
            <Link href="/signup">
              <a data-cy-signup>Sign up</a>
            </Link>
          </p>
        </div>
        <div>
          <LoginForm />
        </div>
      </main>
    </Container>
  );
}
