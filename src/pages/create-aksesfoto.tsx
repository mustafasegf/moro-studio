import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import router from "next/router";

export default function CreateCatalogue() {
  const [nama, setNama] = useState("");
  const [durasi, setDurasi] = useState("");
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");

  const addCatalogue = api.catalogue.addCatalogue.useMutation();

  useEffect(
    function () {
      if (addCatalogue.isSuccess) {
        void router.push("/list-catalogue");
      }
    },
    [addCatalogue.isSuccess]
  );

  const handleSubmitPaket = (e: FormEvent) => {
    e.preventDefault();
    addCatalogue.mutate({ nama, durasi, harga, deskripsi });
  };

  return (
    <>
      {addCatalogue.isSuccess && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Katalog telah berhasil ditambahkan</span>
          </div>
        </div>
      )}

      {addCatalogue.error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Katalog tidak dapat ditambahkan.</span>
          </div>
        </div>
      )}

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Tambah Foto
      </h1>

      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmitPaket}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="paket-foto"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Masukkan Foto
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </div>
              </div>
            </div>

            <div className="bg-gray-300 px-4 py-3 text-right sm:px-6">
              <Link
                href="/list-catalogue"
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-gray-200 sm:mr-3 sm:w-auto"
              >
                Kembali
              </Link>
              <button
                type="submit"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white hover:bg-gray-700 sm:mt-0 sm:w-auto"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
