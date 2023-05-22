import React from "react";

export default function DraftList() {
  return (
    <>
      <div className="bg-white py-5">
        <div>
          <p className="mx-5 flex text-2xl font-bold text-black">Draf Blog</p>
        </div>

        <div>
          <a href="createblast" className="btn-sm btn mx-5 my-5 ">
            + | Buat email blast baru
          </a>
        </div>

        <div>
          {/* to solve text overflow can either make new attribute foe blog obj (description), or just let it happened :) */}
          {/* make the loop func here */}
          <div className="card card-compact mx-5 mb-2 flex justify-center rounded-none bg-white shadow-md">
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

                    

                    <td className="w-6/10 px-2">
                      <div >
                      <div>
                        <td>
                        <p className="max-w-min badge rounded-none w-20">12/05/2013
                        
                      </p>
                        </td>
                        <td>
                            <p className="card-title text-black">
                        halo ini judul email blast terkirim
                        </p></td>
                      </div>
                        
                      
                        
                      <p className="text-black  ">
                        is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industrys standard
                        dummy text ever since the 1500s, printing and
                        typesetting industry. Lorem Ipsum has been the
                        industrys standard dummy text ever since the 1500s,
                      </p>
                      </div>
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* loop end here */}
        </div>
      </div>
    </>
  );
}