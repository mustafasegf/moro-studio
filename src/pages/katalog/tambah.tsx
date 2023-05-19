import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import router from "next/router";
import { addCatalogueSchema, AddCatalogueSchema } from "~/utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";

export default function CreateCatalogue() {
  const addCatalogue = api.catalogue.addCatalogue.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddCatalogueSchema>({
    resolver: zodResolver(addCatalogueSchema),
  });

  useEffect(
    function() {
      if (addCatalogue.isSuccess) {
        setTimeout(() => {
          void router.push("/katalog");
        }, 1000);
      }
    },
    [addCatalogue.isSuccess]
  );
  useEffect(
    function() {
      if (addCatalogue.isError) {
        setTimeout(() => {
          addCatalogue.reset();
        }, 5000);
      }
    },
    [addCatalogue.isError]
  );

  const onSubmit = (val: AddCatalogueSchema) => {
    addCatalogue.mutate(val);
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
        Buat Paket Foto
      </h1>

      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-[#e5e7eb] px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="paket-foto"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nama Paket Foto
                  </label>
                  <input
                    type="text"
                    id="paket-foto"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("nama")}
                  />
                  {errors.nama && (
                    <span className={cn("mb-4", { "text-error": errors.nama })}>
                      {errors.nama.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="durasi"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Durasi
                  </label>
                  <select
                    id="durasi"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("durasi", { valueAsNumber: true })}
                  >
                    {/* <option value={0}>0 menit</option> */}
                    <option value={40}>40 menit</option>
                    <option value={40 * 2}>1 jam 20 menit</option>
                    <option value={40 * 3}>2 jam</option>
                    <option value={40 * 4}>2 jam 40 menit</option>
                    <option value={40 * 5}>3 jam 20 menit</option>
                    <option value={40 * 6}>4 jam</option>
                  </select>

                  {errors.durasi && (
                    <span
                      className={cn("mb-4", { "text-error": errors.durasi })}
                    >
                      {errors.durasi.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="harga"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Harga
                  </label>
                  <div className="mt-2 flex flex-col">
                    <div className="flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                        Rp
                      </span>
                      <input
                        type="number"
                        min={1}
                        id="harga"
                        className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="50000"
                        {...register("harga", {
                          setValueAs: (v) => (!v ? 0 : parseInt(v)),
                        })}
                      />
                    </div>
                    {errors.harga && (
                      <span
                        className={cn("mb-4", { "text-error": errors.harga })}
                      >
                        {errors.harga.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="jumlah"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Jumlah Orang
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      min={1}
                      id="jumlah"
                      className="mt-1 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="jumlah orang"
                      {...register("jumlahOrang", {
                        setValueAs: (v) => (!v ? undefined : parseInt(v)),
                      })}
                    ></input>

                    {errors.jumlahOrang && (
                      <span
                        className={cn("mb-4", {
                          "text-error": errors.jumlahOrang,
                        })}
                      >
                        {errors.jumlahOrang.message}
                      </span>
                    )}
                  </div>
                </div>

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
                      {...register("deskripsi")}
                    ></textarea>

                    {errors.deskripsi && (
                      <span
                        className={cn("mb-4", {
                          "text-error": errors.deskripsi,
                        })}
                      >
                        {errors.deskripsi.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light-grey px-4 py-3 text-right sm:px-6">
              <Link
                href="/katalog"
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-auto"
              >
                Kembali
              </Link>
              <button
                type="submit"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-grey py-2 px-3 text-sm font-semibold text-white-grey hover:bg-medium-grey sm:mt-0 sm:w-auto"
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
