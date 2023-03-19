import React from "react";

export default function SelectedPost() {
  return (
    <>
      <div className="bg-white py-5 ">
        <div>
          <div className="pb-5">
          <a href="/blog" className="mx-5 btn btn-outline btn-sm ">Kembali</a>
          </div>
          <div className=" mx-5 flex h-80 justify-center rounded-lg border">
            <img
              className="w-full rounded-lg object-fill"
              src="https://picsum.photos/800/600?image=1080"
              alt="Shoes"
            />
          </div>
        </div>
        <div className="mx-5 my-5">
          <h1 className="text-black font-bold">Ini adalah judul</h1>
          <p className="badge rounded-none w-20 badge-outline">12/05/2013</p>
        </div>

        <div className="mx-5 ">
        <p className="text-black">What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>

        <div className="mt-10">
        <h1 className="text-black font-bold mx-5 my-5">Berikan Komentar Anda</h1>
        <div className="mx-5 flex justify-center">
                <input
                  type="text"
                  placeholder="Masukkan nama anda"
                  className="input-bordered input w-screen bg-white"
                />
              </div>
              <div className="mx-5 mt-2 flex justify-center">

                <input
                  type="text"
                  placeholder="Masukkan komentar anda"
                  className="input-bordered input w-screen bg-white"
                  />
                  </div>
              <div className=" mx-5 my-5 mb-10 flex justify-center">
                <button className="btn-sm btn  w-full">Kirim komentar</button>
              </div>
              <div className="">
              <h1 className="text-black font-bold mx-5 my-5">Komentar pengguna lain</h1>

              </div>
        </div>
      </div>
    </>
  );
}
