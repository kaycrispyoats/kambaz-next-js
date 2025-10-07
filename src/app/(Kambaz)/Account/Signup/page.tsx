import './styles.css';
import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="formContainer">
      <h3 className="formTitle">Sign up</h3>

      <input placeholder="username" className="formInput wd-username" />
      <input placeholder="password" type="password" className="formInput wd-password" />
      <input placeholder="verify password" type="password" className="formInput wd-password-verify" />

      <Link href="Profile" className="btn btn-primary btn-sm formButton">
        Sign up
      </Link>

      <Link href="Signin" className="formLink">
        Sign in
      </Link>
    </div>
  );
}
