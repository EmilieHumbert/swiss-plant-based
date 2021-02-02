import Link from "next/link";

export default function signUpPage() {
  return (
    <div>
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
        <div>{/* Create sign up form component and add it here */}</div>
      </div>
    </div>
  );
}
