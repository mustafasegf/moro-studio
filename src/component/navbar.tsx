import Link from "next/link";

function Navbar() {
  return (
    <>
      <div className="navbar bg-[#595959]">
        <div className="flex-1">
          <Link
            href="/"
            className="btn-ghost btn text-xl normal-case text-white  hover:bg-gray-200 hover:text-gray-800"
          >
            Moro Studio
          </Link>
          <ul className="menu menu-horizontal px-1">
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
            <li>
              <Link
                href="/login"
                className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export { Navbar };
