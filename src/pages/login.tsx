import { type FormEvent, useState, useEffect } from "react";
import { LoadingPage } from "~/component/loading";
import makeToast from "~/component/toast";
import { api } from "~/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const login = api.auth.login.useMutation();

  useEffect(
    function() {
      if (login.isSuccess) {
        makeToast("link login berhasil dikirim");
        const timeout = setTimeout(() => {
          login.reset();
        }, 1500);
        return () => clearTimeout(timeout);
      }
    },
    [login.isSuccess]
  );

  useEffect(
    function() {
      if (login.isError) {
        makeToast(`Eror: ${login.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          login.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [login.isError]
  );
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    login.mutate({ email });
  }

  return (
    <>
      <div className="flex content-center justify-center">
        <div className="m-4 flex flex-col gap-2 border border-white p-[10%]">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text">Masukan Email</span>
            </label>
            <input
              type="text"
              placeholder="mail@example.com"
              className="input-primary input my-4 w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input type="submit" className="btn" />
          </form>
          {login.isLoading && <LoadingPage />}
        </div>
      </div>
    </>
  );
}
