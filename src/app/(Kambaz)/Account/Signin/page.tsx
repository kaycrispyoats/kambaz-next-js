import Link from "next/link";
import './styles.css';

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="signinContainer">
      <h3 className="signinTitle">Sign in</h3>

      <input placeholder="username" className="signinInput wd-username" />
      <input placeholder="password" type="password" className="signinInput wd-password" />

      <Link href="/Account/Profile" className="btn btn-primary btn-sm signinButton">
        Sign in
      </Link>

      <Link href="/Account/Signup" className="signupLink">
        Sign up
      </Link>
    </div>
  );
}
