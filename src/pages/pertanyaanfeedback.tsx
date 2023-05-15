import { FormEvent, useState } from "react";
import { Navbar } from "../component/navbar";
import { api } from "~/utils/api";
import Link from "next/link";

export default function Feedback() {
  const [pertanyaan, setPertanyaan] = useState("");
  const addPertanyaanFeedback = api.pertanyaanFeedback.addPertanyaanFeedback.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(pertanyaan);

    addPertanyaanFeedback.mutate({ pertanyaan });
    window.location.href = "/listPertanyaanFeedback";
  };

  return (
    <>
    <h1 className="my-8 text-center text-3xl font-bold">Buat Feedback</h1>
    <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-6">
              <label
                    htmlFor="deskripsi"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Deskripsi
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="deskripsi"
                      rows={5}
                      className="mt-1 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="deskripsi paket foto"
                    ></textarea>

                    {/* {errors.deskripsi && (
                      <span
                        className={cn("mb-4", {
                          "text-error": errors.deskripsi,
                        })}
                      >
                        {errors.deskripsi.message}
                      </span>
                    )} */}
                  </div>
                </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <Link href="/listfeedback" type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mr-3 sm:w-auto">Kembali</Link>
                <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-0 sm:w-auto">Simpan</button>
              </div>
            </div>  
          </form>
        </div>
    </>
  );
}
