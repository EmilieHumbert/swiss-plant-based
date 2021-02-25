import React from "react";

import Head from "next/head";
import Link from "next/link";

import { useRequireAuth } from "../hooks/useRequireAuth";

import { Container } from "@material-ui/core";

export default function Home() {
  const auth = useRequireAuth();

  return (
    <Container maxWidth={"md"}>
      <Head>
        <title>Recipe home page</title>
      </Head>

      <main>
        {!auth.user ? (
          <>
            <p>Don&apos;t have an account?</p>
            <Link href="/signup">
              <a href="#">Sign up</a>
            </Link>
            <p>You have an account?</p>
            <Link href="/login">
              <a href="#">Log in</a>
            </Link>
          </>
        ) : (
          <>
            <h2>Edit profile</h2>
            <Link href="/profile">Profile</Link>
          </>
        )}
      </main>
    </Container>
  );
}
