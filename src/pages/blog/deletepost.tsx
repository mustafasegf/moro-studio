import React from "react";

export default function DeletePost() {
  return (
    <>
      <div className="bg-white py-5">
        <div>
          <p className="mx-5 flex pb-5 text-2xl font-bold text-black">
            Draf Blog
          </p>
        </div>

        <div>
          {/* to solve text overflow can either make new attribute foe blog obj (description), or just let it happened :) */}
          {/* make the loop func here */}
          <a href="#" className="card card-compact mx-5 mb-2 flex justify-center rounded-none bg-white shadow-md">
            <div className="card-body">
              <table className="w-10/10 table-fixed">
                <thead>
                  <tr>
                    <th className="w-2/10"></th>
                    <th className="w-6/10"></th>
                    <th className="w-2/10 "></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td className="w-2/10 flex justify-center">
                      <div>
                        <div className="pb-2">
                        <p className="badge rounded-none w-20">12/05/2013</p>
                        </div>
                      <img
                        className="w-20"
                        src="https://picsum.photos/800/600?image=1080"
                        alt="Shoes"
                      />
                        </div>
                    </td>

                    <td className="w-6/10 px-2">
                      <div >
                      <p className="card-title text-black">
                        halo ini judul blog
                      </p>
                      <p className="text-black  ">
                        is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      </div>
                    </td>

                    <td className="w-2/10 ">
                    <div>
                        <button className="flex  justify-center btn-outline btn-error btn-sm btn w-28">
                          Hapus
                        </button>
                    </div>
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </a>
          {/* loop end here */}
        </div>
      </div>
    </>
  );
}
