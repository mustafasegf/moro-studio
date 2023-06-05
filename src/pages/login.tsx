import { type FormEvent, useState, useEffect } from "react";
import { LoadingPage } from "~/component/loading";
import makeToast from "~/component/toast";
import { api } from "~/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const login = api.auth.login.useMutation();

  useEffect(
    function () {
      if (login.isSuccess) {
        makeToast("Link login telah dikirim melalui email.");
        const timeout = setTimeout(() => {
          login.reset();
        }, 1500);
        return () => clearTimeout(timeout);
      }
    },
    [login.isSuccess]
  );

  useEffect(
    function () {
      if (login.isError) {
        makeToast(`Error: ${login.error.message}`, { type: "error" });
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
      <div className="flex min-h-screen items-start justify-center bg-light-grey">
        <div className="w-full max-w-sm rounded-lg border border-white-grey bg-white-grey sm:p-6 mt-20 shadow-xl">
          <div className="rounded-lg px-6 py-8">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
              Login
            </h2>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Masukkan Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Masukkan alamat email Anda"
                    required
                    className="ring-grey block w-full rounded-md border-0 py-2 px-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-5"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white-grey hover:bg-[#6380BB] flex w-full items-center justify-center rounded-md border border-transparent bg-blue py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>
            {login.isLoading && <LoadingPage />}
          </div>
        </div>
      </div>
    </>
  );
}
