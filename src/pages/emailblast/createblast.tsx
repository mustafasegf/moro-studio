import React from "react";

export default function CreateBlast() {
  return (
    <>
      <div className=" bg-white py-5">
        <div>
          <p className="mx-5 flex justify-center text-2xl font-bold text-black">
            Buat Blast Email Baru
          </p>
        </div>

        <form>
          <div className="mx-5">
            <div className=" form-control">
              <div className=" flex justify-center pt-5">
                <input
                  type="text"
                  placeholder="Email tujuan"
                  className="bg-white input-bordered input w-screen"
                />
              </div>

              <div>
                <table className="w-10/10 table-fixed align-text-top">
                  <thead></thead>
                  <tbody className="align-top">
                    <div className="pt-2">
                      <td>
                        <p>Atau tambahkan otomatis user yang sudah..</p>
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Angka.."
                          className="placeholder-slate-300 text-slate-600 bg-white bg-white relative w-16 rounded border-0 px-2 py-1 text-sm shadow outline-none focus:outline-none focus:ring "
                        />
                      </td>
                    </div>

                    <td>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">bulan terdaftar</span>
                          <input
                            type="radio"
                            name="radio-10"
                            className="checked:bg-red-500 radio"
                            checked
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text pr-2">
                            kali menggunakan jasa
                          </span>
                          <input
                            type="radio"
                            name="radio-10"
                            className="checked:bg-blue-500 radio"
                            checked
                          />
                        </label>
                      </div>
                    </td>
                  </tbody>
                </table>
              </div>

              <div className=" flex justify-center pt-5">
                <input
                  type="text"
                  placeholder="Subject email"
                  className="bg-white input-bordered input w-screen"
                />
              </div>

              <div className=" flex justify-center pt-5">
                <textarea
                  placeholder="Isi Blast Email"
                  className="bg-white input-bordered input h-72 w-screen rounded-lg border pt-3"
                ></textarea>
              </div>

              <a href="blastlist" className="btn mx-10 my-10">
                Kirim Blast Email
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
