import Link from "next/link";
import { useAuth } from "~/utils/session";

export function Navbar() {
  const { session, logout } = useAuth();

  return (
    <>
      <div className="navbar bg-[#595959]">
        <div className="flex-1">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
            <li>
              <Link
                href="/listfeedback"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                href="/list-catalogue"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Catalogue
              </Link>
            </li>
            <li>
              <Link
                href="/homepage/edit"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Edit Homepage
              </Link>
            </li>
            <li>
              {session ? (
                <p
                  onClick={logout}
                  className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
                >
                  Logout
                </p>
              ) : (
                <Link
                  href="/login"
                  className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
                >
                  Login
                </Link>
              )}
            </li>

            </ul>
          </div>

          <Link
            href="/"
            className="btn-ghost btn text-xl normal-case text-white  hover:bg-gray-200 hover:text-gray-800"
          >
            Moro Studio
          </Link>


          <ul className="menu menu-horizontal hidden px-1 lg:flex">
            <li>
              <Link
                href="/listfeedback"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                href="/list-catalogue"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Catalogue
              </Link>
            </li>
            <li>
              <Link
                href="/homepage/edit"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Edit Homepage
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {session && session?.role !== "user" && (
              <li className="hidden sm:block">
                <p className="mr-2 text-white">role: {session?.role}</p>
              </li>
            )}
            {session && (
              <li className="hidden sm:block">
                <p className="mr-2 text-white">Hi {session?.nama}!</p>
              </li>
            )}

            <li className="hidden sm:block">
              {session ? (
                <p
                  onClick={logout}
                  className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
                >
                  Logout
                </p>
              ) : (
                <Link
                  href="/login"
                  className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn-ghost btn lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li tabIndex={0}>
          <a className="justify-between">
            Parent
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </a>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
    <a className="btn-ghost btn text-xl normal-case">daisyUI</a>
  </div>

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li>
        <a>Item 1</a>
      </li>
      <li tabIndex={0}>
        <a>
          Parent
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </a>
        <ul className="p-2">
          <li>
            <a>Submenu 1</a>
          </li>
          <li>
            <a>Submenu 2</a>
          </li>
        </ul>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  </div>
</div>;
