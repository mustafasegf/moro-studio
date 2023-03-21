import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const login = api.auth.login.useMutation();

  function handleSubmit(e: FormEvent)  {
    e.preventDefault();

    login.mutate({ email });
  }

  return (
    <>
      {login.isSuccess && (
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>link terkirim</span>
            </div>
          </div>
        </div>
      )}

      {login.error && (
        <div className="toast">
          <div className="alert alert-error">
            <div>
              <span>Something went wrong. {login.error.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex content-center justify-center">
        <div className="border border-white p-[10%] m-4">
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
        </div>
      </div>
    </>
  );
}
