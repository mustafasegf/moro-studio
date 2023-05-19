import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import router from "next/router";

export default function CreateKupon() {
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [diskon, setDiskon] = useState(0.0);
  const [kuotaPemakaian, setKuotaPemakaian] = useState(0);
  const [tanggal, setTanggal] = useState(new Date());

  const addKupon = api.kupon.addKupon.useMutation();

  useEffect(
    function () {
      if (addKupon.isSuccess) {
        void router.push("/kupon/list-kupon");
      }
    },
    [addKupon.isSuccess]
  );

  const handleSubmitKupon = (e: FormEvent) => {
    e.preventDefault();
    addKupon.mutate({ nama, kode, diskon, kuotaPemakaian, tanggal });
  };

  return (
    <>
      {addKupon.isSuccess && (
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
            <span>Kupon telah berhasil ditambahkan</span>
          </div>
        </div>
      )}

      {addKupon.error && (
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
            <span>Error! Kupon tidak dapat ditambahkan.</span>
          </div>
        </div>
      )}

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Buat Kupon Baru
      </h1>

      <div className="flex w-full flex-wrap">
        <form className="w-full" onSubmit={handleSubmitKupon}>
          <div className="mt-6 grid grid-cols-4 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 ml-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Nama Kupon
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                required
                type="text"
                name="nama-kupon"
                id="nama-kupon"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 ml-2 flex items-center">
              <label
                htmlFor="kode-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Kode Kupon
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                required
                type="text"
                name="kode-kupon"
                id="kode-kupon"
                className="text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset ring-dark-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setKode(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 ml-2 flex items-center">
              <label
                htmlFor="diskon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Diskon
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <label className="input-group-md input-group">
                <input
                  required
                  type="number"
                  min={1}
                  name="diskon"
                  id="diskon"
                  placeholder="20"
                  className="input-bordered input h-9 w-full ring-1 ring-dark-grey"
                  onChange={(e) => setDiskon(parseFloat(e.target.value))}
                />
                <span className="ring-1 ring-dark-grey">%DISKON</span>
              </label>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 ml-2 flex items-center">
              <label
                htmlFor="kuota"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Kuota Pemakaian
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                required
                type="number"
                min={1}
                name="kuota"
                id="kuota"
                className="text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset ring-dark-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setKuotaPemakaian(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 ml-2 flex items-center">
              <label
                htmlFor="tanggal"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Tanggal Kadaluarsa
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                required
                type="date"
                min={new Date().toISOString().split("T")[0]}
                name="tanggal"
                id="tanggal"
                className="focus:shadow-outline text-gray-700 w-full appearance-none rounded border py-2  px-3 leading-tight shadow focus:outline-none"
                onChange={(e) => setTanggal(new Date(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-6 flex w-full flex-wrap">
            <Link
              href="/kupon/list-kupon"
              type="button"
              className="ml-8 inline-flex w-full justify-center rounded-md bg-light-grey px-3 py-2 text-sm font-semibold text-black transition duration-300 ease-in-out hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-28"
            >
              Kembali
            </Link>
            <button
              type="submit"
              className="mt-2 inline-flex w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-28"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
