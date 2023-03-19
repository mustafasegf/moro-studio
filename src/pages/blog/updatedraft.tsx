import React from "react";

export default function UpdateDraft() {
  let bg= "https://picsum.photos/800/600?image=1080"

    return (
    <>
      <div className="bg-white py-5">
        
        <div>
          <p className="flex justify-center text-2xl font-bold text-black">
          Ubah Draft Blog
          </p>
        </div>
        
        <form>
          <div className="mx-5">
            <div className="form-control">
            
              <div className=" border mx-5 mt-10 flex justify-center rounded-lg h-48">
                <img src={bg} className="rounded-lg opacity-50"> 

                </img>
                <div className="pt-12 absolute form-control w-full max-w-xs align-middle">
                  <label className=" label">
                    <span className="text-black label-text">Pilih Thumbnail Baru</span>
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs fill-white" />
                </div>
              </div>
              
              <div className="mx-5 pt-5 flex justify-center">
                <input
                  type="text"
                  placeholder="halo ini judul blog"
                  className="input-bordered input w-screen bg-white"
                />
              </div>
              
              <div className="mx-5 pt-5 flex justify-center ">
                <textarea placeholder="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," className="bg-white border rounded-lg input-bordered input w-screen pt-3 h-72"></textarea>
              </div>

              <a href="draftlist" className="btn mx-5 my-10">Simpan Perubahan</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
