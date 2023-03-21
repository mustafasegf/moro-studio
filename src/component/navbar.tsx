import Link from "next/link";
import { destroyCookie } from "nookies";
import { api } from "~/utils/api";

function Navbar() {
  const {data} = api.auth.getSession.useQuery();
  const utils = api.useContext();

  function logoutHandler() {
    destroyCookie(null, "token");
    utils.auth.getSession.invalidate();
  }

  return (
    <>
      <div className="navbar bg-[#595959]">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-white text-xl normal-case  hover:bg-gray-200 hover:text-gray-800">
            Moro Studio
          </Link>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/listfeedback" className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800">Feedback</Link>
            </li>
            <li>
              <Link href="/list-catalogue" className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800">Catalogue</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <p className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800">login as: {data?.nama}</p>
            </li>
            <li>
              {data 
                ? <p onClick={logoutHandler} className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800">Logout</p>
                : <Link href="/login" className="mr-2 text-white hover:bg-gray-200 hover:text-gray-800">Login</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export { Navbar };
