import { api } from "~/utils/api";
import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "../components/dialog";

export default function ListCatalogue() {
  const { data, isLoading, error } = api.catalogue.getAllCatalogue.useQuery();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Photo Catalogue</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/create-catalogue">
          <button className="mr-4 rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
            + Tambah Paket Foto
          </button>
        </Link>
      </div>

      {data?.map((item) => (
        <div
          key={item.id}
          className="mx-4 my-6 rounded-lg bg-gray-200 p-6 shadow-lg md:mx-10 lg:mx-20"
        >
          <h2 className="text-center text-xl font-bold">{item.nama}</h2>
          <div className="mt-6 rounded-md bg-gray-300 p-4 text-black">
            <div className="text">
              <pre>{item.deskripsi}</pre>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="mb-4 flex items-center">
                <BiTimeFive className="mr-2 text-2xl text-gray-600" />
                <span>{item.durasi}</span>
              </div>
              <div className="flex items-center">
                <IoIosPricetag className="mr-2 text-2xl text-gray-600" />
                <span>
                  {item.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
            </div>
            <div className="text-right">
              <Link
                href={`/update-catalogue/${item.id}`}
                className="mr-2 rounded-md border  border border-gray-600 border-gray-600 px-6 py-2 text-gray-600 transition duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-gray-200"
              >
                Ubah
              </Link>
              <button
                onClick={toggleDialog}
                className="rounded-md border border-red-500 bg-red-500 px-6 py-2 text-white transition duration-300 ease-in-out hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                Hapus
              </button>
              <Dialog
                title="Hapus Katalog"
                content="Apakah Anda yakin akan menghapus katalog ini?"
                id={item.id}
                isOpen={isOpen}
                onClose={toggleDialog}
              />
              {/* <button className="rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
                Pilih Jadwal
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
