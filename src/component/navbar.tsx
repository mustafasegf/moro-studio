import Link from "next/link";
import Image from "next/image";
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
      path: "/feedback/list",
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
    {
      name: "Kupon",
      path: "/kupon/list-kupon",
      role: "admin",
    },
  ];

  return (
    <>
      <div className="navbar bg-dark-grey">
        <div className="flex-1">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
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
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-dark-grey p-2 shadow"
            >

            {pages.map(
              (page) =>
                (session?.role === page.role || page.role === undefined) && (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="mr-2 text-white-grey text-base-content hover:bg-base-300 hover:text-black"
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
                    className="text-white-grey hover:bg-light-grey hover:text-black"
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    href="/login"
                    className="text-white-grey hover:bg-light-grey hover:text-black"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  className="block h-12 w-auto lg:hidden"
                  src="/Logo Morostudio.png"
                  alt="Logo Morostudio"
                  width={50}
                  height={50}
                />
              </Link>
              <Link href="/">
                <Image
                  className="ml-6 hidden h-12 w-auto lg:block"
                  src="/Logo Morostudio.png"
                  alt="Logo Morostudio"
                  width={50}
                  height={50}
                />
              </Link>
            </div>

            <Link
              href="/"
              className="text-white-grey btn-ghost btn text-xl normal-case"
            >
              Moro Studio
            </Link>
          </div>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal hidden px-1 lg:flex">
            {/* <li>
              <Link
                href="/listfeedback"
                className="text-white-grey mr-2 underline-offset-8 hover:underline"
              >
                Feedback
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="/katalog/list-catalogue"
                className="text-white-grey mr-2 underline-offset-8 hover:underline"
              >
                Catalogue
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="/kupon/list-kupon"
                className="text-white-grey mr-2 underline-offset-8 hover:underline"
              >
                Kupon
              </Link>
            </li> */}
          </ul>
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
                <p className="text-white-grey mr-2">role: {session?.role}</p>
              </li>
            )}
            {session && (
              <li className="hidden sm:block">
                <p className="mr-2 text-white-grey bg-[#595959]">Hi {session?.nama}!</p>
              </li>
            )}

            <li className="hidden sm:block">
              {session ? (
                <p
                  onClick={logout}
                  className="text-white-grey mr-3 border-2 border-white-grey bg-transparent py-2 px-4 font-semibold transition duration-300 ease-in-out hover:bg-light-grey hover:text-black hover:border-light-grey"
                >
                  Logout
                </p>
              ) : (
                <Link
                  href="/login"
                  className="text-white-grey mr-3 border-2 border-white-grey bg-transparent py-2 px-4 font-semibold transition duration-300 ease-in-out hover:bg-light-grey hover:text-black hover:border-light-grey"
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
