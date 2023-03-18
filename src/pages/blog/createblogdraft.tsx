import React from "react";

export default function CreateBlogDraft() {
  return (
    <>
      <div className="bg-white py-5">
        
        <div>
          <p className="flex justify-center text-2xl font-bold text-black">
          Buat Draft Blog Baru
          </p>
        </div>
        
        <form>
          <div className="w-screen">
            <div className="form-control">
              
              <div className="border mx-10 mt-10 flex justify-center rounded-lg py-16">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Pilih Thumbnail</span>
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs fill-white" />
                </div>
              </div>
              
              <div className="mx-10 pt-5 flex justify-center">
                <input
                  type="text"
                  placeholder="Judul Blog"
                  className="input-bordered input w-screen bg-white"
                />
              </div>
              
              <div className="mx-10 pt-5 flex justify-center">
                <textarea placeholder="Isi Blog" className="bg-white border rounded-lg input-bordered input w-screen pt-3 h-72"></textarea>
              </div>

              <button className="btn mx-10 my-10">Simpan Draft</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
