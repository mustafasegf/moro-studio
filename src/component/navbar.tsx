import Link from "next/link";

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            Moro Studio
          </Link>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/listfeedback">Feedback</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export { Navbar };
