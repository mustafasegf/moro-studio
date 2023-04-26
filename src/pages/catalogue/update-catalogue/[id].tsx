import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function UpdateCatalogue() {
  const [nama, setNama] = useState("");
  const [durasi, setDurasi] = useState("");
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");

  const updateCatalogue = api.catalogue.updateCatalogue.useMutation();
  const router = useRouter();
  const { id } = router.query as Query

  useEffect(
    function () {
      if (updateCatalogue.isSuccess) {
        void router.push("/catalogue/list-catalogue");
      }
    },
    [updateCatalogue.isSuccess]
  );

  const { data, isLoading, error } = api.catalogue.getCatalogueById.useQuery({id});

  useEffect(() => {
    if (data) {
      setNama(data.nama);
      setDurasi(data.durasi);
      setHarga(data.harga);
      setDeskripsi(data.deskripsi);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdatePaket = (e: FormEvent) => {
    e.preventDefault();
    updateCatalogue.mutate({ id, nama, durasi, harga, deskripsi });
  };

  return (
    <>
      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Ubah Paket Foto
      </h1>

      {
        <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleUpdatePaket}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="paket-foto"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nama Paket Foto
                    </label>
                    <input
                      value={nama}
                      type="text"
                      name="paket-foto"
                      id="paket-foto"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="durasi"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Durasi
                    </label>
                    <select
                      value={durasi}
                      id="durasi"
                      name="durasi"
                      className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setDurasi(e.target.value)}
                    >
                      <option>0 menit</option>
                      <option>40 menit</option>
                      <option>1 jam 20 menit</option>
                      <option>2 jam</option>
                      <option>2 jam 40 menit</option>
                      <option>3 jam 20 menit</option>
                      <option>4 jam</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="harga"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Harga
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                        Rp
                      </span>
                      <input
                        value={harga}
                        type="text"
                        name="harga"
                        id="harga"
                        className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="50000"
                        onChange={(e) => setHarga(parseInt(e.target.value))}
                      />
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
                        value={deskripsi}
                        id="deskripsi"
                        name="deskripsi"
                        rows={5}
                        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        placeholder="deskripsi paket foto"
                        onChange={(e) => setDeskripsi(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-300 px-4 py-3 text-right sm:px-6">
                <Link
                  href="/catalogue/list-catalogue"
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
      }
    </>
  );
}
