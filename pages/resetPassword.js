import Link from "next/link";

import ResetPasswordForm from "../components/forms/resetPasswordForm";

import Container from "@material-ui/core/Container";

export default function ResetPasswordPage() {
  return (
    <Container maxWidth={"xs"}>
      <Head>
        <title>Reset password page</title>
      </Head>
      
      <main>
        <h2>Reset password</h2>
        <p>
          {"Didn't forget? "}
          <Link href="/login">
            <a href="#">Login</a>
          </Link>
        </p>

        <ResetPasswordForm />
      </main>
    </Container>
  );
}
