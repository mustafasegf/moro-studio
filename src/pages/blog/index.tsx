import React from "react";


export default function Blog() {
  return (
    <>
      <div>
        <h1>Hellow</h1>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
    </>
  );
}
