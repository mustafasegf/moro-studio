import Link from "next/link";
import { useAuth } from "~/utils/session";

export function Navbar() {
  const { session, logout } = useAuth();
  const pages = [
    {
      name: "Pesan",
      path: "/pesan",
      role: undefined,
    },
    {
      name: "Feedback",
      path: "/listfeedback",
      role: "user",
    },
    {
      name: "Katalog",
      path: "/katalog",
      role: "admin",
    },
    {
      name: "Edit Homepage",
      path: "/homepage/edit",
      role: "admin",
    },
  ];

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

            {pages.map(
              (page) =>
                (session?.role === page.role || page.role === undefined) && (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="mr-2 text-base-content hover:bg-base-300"
                    >
                      {page.name}
                    </Link>
                  </li>
                )
            )}
              <li>
                {session ? (
                  <p
                    onClick={logout}
                    className="mr-2 text-base-content hover:bg-base-300"
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    href="/login"
                    className="mr-2 text-base-content hover:bg-base-300"
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
            {pages.map(
              (page) =>
                (session?.role === page.role || page.role === undefined) && (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="mr-2 text-base-100 hover:bg-base-300 hover:text-base-content"
                    >
                      {page.name}
                    </Link>
                  </li>
                )
            )}
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
                <p className="mr-2 text-white bg-[#595959]">Hi {session?.nama}!</p>
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
