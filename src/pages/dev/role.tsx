import { useAuth } from "~/utils/session";

export default function DevChangeRole() {
  const { changeUser } = useAuth()

  function handleAdmin() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzMmVhMDAwMDB0YmwxcWFrdWxnbTMiLCJuYW1hIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk1NjY5MTJ9.C2619IzwL1avFzCgzgsWSjz2A-J9jaxQ7kcjoXKWoXE"
    changeUser(token)
  }

  function handleStudioManager() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmt0MjFzMzAwMGF0YmwxaW56aHluYWIiLCJuYW1hIjoiU3R1ZGlvIE1hbmFnZXIiLCJyb2xlIjoic3R1ZGlvTWFuYWdlciIsImlhdCI6MTY3OTU2NzEwNn0.BuJ5wRhel-vtzjKpNDVygHuEMRG5xohy_DInu0Dlo1A"
    changeUser(token)
  }

  function handleBlogManager() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzZXp4MzAwMDR0YmwxbG03OHlibnkiLCJuYW1hIjoiQmxvZyBNYW5hZ2VyIiwicm9sZSI6ImJsb2dNYW5hZ2VyIiwiaWF0IjoxNjc5NTY3MDQ1fQ.xSA9e7NtAq_AQNmuvScFm9tS2h3Um9_4f4auYYoj5Sw"
    changeUser(token)
  }

  function handleUser() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzNmVhYjAwMDJ0YmwxdnptcXp2OXoiLCJuYW1hIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc5NTY3MTI0fQ.viaJMsSlzJXFe97UjeU0Kv6atEajf2ScPRLKmDbKQJY"
    changeUser(token)
  }

  function handleLogout() {
    changeUser("")
  }

  return (
    <div className="m-8">
      <h1 className="mb-8">Dev Change Role</h1>
      <div className="flex flex-col max-w-xs gap-2">
        <button onClick={handleAdmin} className="btn">Change to admin</button>
        <button onClick={handleStudioManager} className="btn">Change to studio manager</button>
        <button onClick={handleBlogManager} className="btn">Change to blog manager</button>
        <button onClick={handleUser} className="btn">Change to user</button>
        <button onClick={handleLogout} className="btn">Logout</button>

      </div>
    </div>
  );
}