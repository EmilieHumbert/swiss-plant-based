import React from "react";

import Link from "next/link";
import Head from "next/head";

import ResetPasswordForm from "../components/forms/resetPasswordForm";

import Container from "@material-ui/core/Container";

export default function ResetPasswordPage() {
  return (
    <Container maxWidth={"xs"}>
      <Head>
        <title>Reset password page</title>
      </Head>

      <main>
        <h2 data-cy-resetpassword-title>Reset your password</h2>
        <p>
          {"Didn't forget? "}
          <Link href="/login">
            <a data-cy-resetpassword-loginlink>Login</a>
          </Link>
        </p>

        <ResetPasswordForm />
      </main>
    </Container>
  );
}
