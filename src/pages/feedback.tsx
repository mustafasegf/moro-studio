import { FormEvent, useState } from "react";

import { Navbar } from "../component/navbar";

import { api } from "~/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const addContoh = api.contoh.addContoh.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);

    addContoh.mutate({ email });
  };

  return (
    <>
      {addContoh.isSuccess && (
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>Contoh added </span>
            </div>
          </div>
        </div>
      )}

      {addContoh.error && (
        <div className="toast">
          <div className="alert alert-error">
            <div>
              <span>Something went wrong. {addContoh.error.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex content-center justify-center">
        <div className="border border-white p-[10%] md:p-40 bg-[#CBC3E3]">
          <h1>Feedback</h1>
          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text">Masukan nama</span>
            </label>
            <input
              type="text"
              placeholder="Nama"
              className="input-primary input my-4 w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea className="textarea textarea-primary textarea-lg w-full max-w-xs" placeholder="Isi Feedback"></textarea>

            
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    </>
  );
}
