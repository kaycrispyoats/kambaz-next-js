import Link from "next/link";
import './styles.css';

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="profileContainer">
      <h3 className="profileTitle">Profile</h3>

      <input
        defaultValue="alice"
        placeholder="username"
        className="profileInput wd-username"
      />
      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className="profileInput wd-password"
      />
      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="profileInput"
      />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="profileInput"
      />
      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="profileInput"
      />
      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="profileInput"
      />
      <select
        defaultValue="FACULTY"
        id="wd-role"
        className="profileSelect"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link
        href="/Account/Signin"
        className="btn btn-danger btn-sm profileButton"
      >
        Sign out
      </Link>
    </div>
  );
}
