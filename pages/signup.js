import Link from "next/link";
import SignUpForm from "../components/forms/signUpForm";

export default function signUpPage() {
  return (
    <div>
      <div>
        <h2>Sign up</h2>
        <p>
          Already have an account?
          <Link href="/login">
            <a href="#"></a>
          </Link>
        </p>
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
