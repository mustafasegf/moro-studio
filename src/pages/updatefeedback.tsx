import { FormEvent, useState } from "react";
import { Navbar } from "../component/navbar";
import { api } from "~/utils/api";

export default function Feedback() {
  const [Id, setId] = useState("");
  const [isiFeedback, setIsiFeedback] = useState("");
  const updateFeedback = api.feedback.updateFeedback.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(Id)
    console.log(isiFeedback);

    updateFeedback.mutate({ Id, isiFeedback });
    window.location.href = "/listfeedback";
  };

  return (
    <>

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
              className="input-primary input my-4 w-full max-w-xs" disabled
            />
            <textarea 
              className="textarea textarea-primary textarea-lg w-full max-w-xs" 
              placeholder="Isi Feedback"
              onChange={(e) => setIsiFeedback(e.target.value)}
            />
            
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    </>
  );
}
