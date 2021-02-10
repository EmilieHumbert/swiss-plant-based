import Head from "next/head";
import Link from "next/link";

import { Container } from "@material-ui/core";

export default function Home() {
  return (
    <Container maxWidth={"md"}>
      <Head>
        <title>Recipe home page</title>
      </Head>

      <main>
        <Link href="/recipes">Recipes</Link>
      </main>
    </Container>
  );
}
