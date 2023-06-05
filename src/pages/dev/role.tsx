import { useAuth } from "~/utils/session";

export default function DevChangeRole() {
  const { changeUser } = useAuth();

  function handleAdmin() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzMmVhMDAwMDB0YmwxcWFrdWxnbTMiLCJuYW1hIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk1NjY5MTJ9.C2619IzwL1avFzCgzgsWSjz2A-J9jaxQ7kcjoXKWoXE";
    changeUser(token);
  }

  function handleStudioManager() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmt0MjFzMzAwMGF0YmwxaW56aHluYWIiLCJuYW1hIjoiU3R1ZGlvIE1hbmFnZXIiLCJyb2xlIjoic3R1ZGlvTWFuYWdlciIsImlhdCI6MTY3OTU2NzEwNn0.BuJ5wRhel-vtzjKpNDVygHuEMRG5xohy_DInu0Dlo1A";
    changeUser(token);
  }

  function handleBlogManager() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzZXp4MzAwMDR0YmwxbG03OHlibnkiLCJuYW1hIjoiQmxvZyBNYW5hZ2VyIiwicm9sZSI6ImJsb2dNYW5hZ2VyIiwiaWF0IjoxNjc5NTY3MDQ1fQ.xSA9e7NtAq_AQNmuvScFm9tS2h3Um9_4f4auYYoj5Sw";
    changeUser(token);
  }

  function handleUser() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzNmVhYjAwMDJ0YmwxdnptcXp2OXoiLCJuYW1hIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc5NTY3MTI0fQ.viaJMsSlzJXFe97UjeU0Kv6atEajf2ScPRLKmDbKQJY";
    changeUser(token);
  }

  function handleLogout() {
    changeUser("");
  }

  return (
    <div className="m-8">
      <h1 className="my-8 text-center text-2xl font-bold md:text-left">
        Ubah Role
      </h1>
      <div className="flex flex-col gap-2 md:max-w-xs">
        <button
          onClick={handleAdmin}
          className="btn border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
        >
          Ubah ke Admin
        </button>
        <button
          onClick={handleStudioManager}
          className="btn border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
        >
          Ubah ke Studio Manager
        </button>
        <button
          onClick={handleBlogManager}
          className="btn border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
        >
          Ubah ke Blog Manager
        </button>
        <button
          onClick={handleUser}
          className="btn border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
        >
          Ubah ke User
        </button>
        <button
          onClick={handleLogout}
          className="btn border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
