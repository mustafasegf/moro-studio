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
      name: "Blog",
      path: "/blog",
      role: undefined,
    },
    {
      name: "Feedback",
      path: "/feedback",
      role: undefined,
    },
    {
      name: "Katalog",
      path: "/katalog",
      role: "admin",
    },
    {
      name: "Edit Homepage",
      path: "/homepage",
      role: "admin",
    },
    {
      name: "Konfirmasi Pesanan",
      path: "/pesan/konfirmasi",
      role: "studioManager",
    },
    {
      name: "Kupon",
      path: "/kupon/list-kupon",
      role: "admin",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      role: "admin" || "studioManager",
    },
    {
      name: "Detail Pesanan",
      path: "/detailpemesanan",
      role: "studioManager" || "admin",
    },
  ];

  return (
    <>
      <div className="navbar fixed top-0 left-0 right-0 z-10 bg-dark-grey">
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
                        className="text-white-grey hover:bg-light-grey hover:text-black"
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
                    className="border text-white-grey hover:border-light-grey hover:bg-light-grey hover:text-black"
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    href="/login"
                    className="border text-white-grey hover:border-light-grey hover:bg-light-grey hover:text-black"
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
              className="btn-ghost btn text-xl normal-case text-white-grey"
            >
              Moro Studio
            </Link>
          </div>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal hidden px-1 lg:flex">
            {pages.map(
              (page) =>
                (session?.role === page.role || page.role === undefined) && (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="mr-2 text-white-grey hover:bg-light-grey hover:text-black"
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
                <p className="mr-2 bg-dark-grey text-white-grey">
                  role: {session?.role}
                </p>
              </li>
            )}
            {session && (
              <li className="hidden sm:block">
                <p className="mr-2 bg-dark-grey font-semibold text-white-grey">
                  Hi {session?.nama}!
                </p>
              </li>
            )}

            <li className="hidden sm:block">
              {session ? (
                <p
                  onClick={logout}
                  className="mr-3 mt-1 border border-white-grey bg-transparent py-2 px-4 font-medium text-white-grey transition duration-300 ease-in-out hover:border-light-grey hover:bg-light-grey hover:text-black"
                >
                  Logout
                </p>
              ) : (
                <Link
                  href="/login"
                  className="mr-3 mt-1 border border-white-grey bg-transparent py-2 px-4 font-medium text-white-grey transition duration-300 ease-in-out hover:border-light-grey hover:bg-light-grey hover:text-black"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="py-8 px-4 sm:px-6"></div>
    </>
  );
}
