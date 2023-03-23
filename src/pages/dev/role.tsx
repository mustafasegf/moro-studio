import { destroyCookie, setCookie } from "nookies";
import { api } from "~/utils/api";
import { useAuth } from "~/utils/session";
import { useRouter } from 'next/router'

export default function DevChangeRole() {
  const { changeUser } = useAuth()
  const router = useRouter()

  function handleAdmin() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzMmVhMDAwMDB0YmwxcWFrdWxnbTMiLCJuYW1hIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk1NjA0OTN9.7niZBgS-0qgmR9lojhKnBC_SybE3LKg8crlTEAmSp18"

    setCookie(null, "token", token, {
      path: "/",
    });
    changeUser(token)
    router.reload()
  }

  function handleStudioAdmin() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmt0MjFzMzAwMGF0YmwxaW56aHluYWIiLCJuYW1hIjoiU3R1ZGlvIEFkbWluIiwicm9sZSI6InN0dWRpb01hbmFnZXIiLCJpYXQiOjE2Nzk1NjIzMzB9.koeQuT5astyQU6FheAerKj7sfQUHCexXHRv_QOxDvmI"

    setCookie(null, "token", token, {
      path: "/",
    });
    changeUser(token)
    router.reload()
  }

  function handleBlogAdmin() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzZXp4MzAwMDR0YmwxbG03OHlibnkiLCJuYW1hIjoiQmxvZyBBZG1pbiIsInJvbGUiOiJibG9nTWFuYWdlciIsImlhdCI6MTY3OTU2MjI4MX0.VCR9vmST7NXTSBwDblf7R-XcYN-xpkSaGiH6P2eBD08"

    setCookie(null, "token", token, {
      path: "/",
    });
    changeUser(token)
    router.reload()
  }


  function handleUser() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZmtzNmVhYjAwMDJ0YmwxdnptcXp2OXoiLCJuYW1hIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc5NTYyMjExfQ.iijFz-U1CSwhZW7F5i3Q6R9OMkVnkFamghNcPc5SQ_g"

    setCookie(null, "token", token, {
      path: "/",
    });
    changeUser(token)
    router.reload()
  }


  function handleLogout() {
    destroyCookie(null, "token", {
      path: "/",
    });
    changeUser("")
    router.reload()
  }

  return (
    <div className="m-8">
      <h1 className="mb-8">Dev Change Role</h1>
      <div className="flex flex-col max-w-xs gap-2">
        <button onClick={handleAdmin} className="btn">Change to admin</button>
        <button onClick={handleStudioAdmin} className="btn">Change to studio manager</button>
        <button onClick={handleBlogAdmin} className="btn">Change to blog manager</button>
        <button onClick={handleUser} className="btn">Change to user</button>
        <button onClick={handleLogout} className="btn">Logout</button>

      </div>
    </div>
  );
}