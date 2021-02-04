import Link from "next/link";
import ResetPasswordForm from "../components/forms/resetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div>
      <div>
        <h2>Reset password</h2>
        <p>
          {"Didn't forget? "}
          <Link href="/login">
            <a href="#">Login</a>
          </Link>
        </p>
      </div>
      <div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
