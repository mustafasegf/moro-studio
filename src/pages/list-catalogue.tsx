import { api } from "~/utils/api";
import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
// import ReactModal from 'react-modal';

export default function ListCatalogue() {
  const { data, isLoading, error } = api.catalogue.getAllCatalogue.useQuery();

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
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
            <div className="text"><pre>{item.deskripsi}</pre></div>
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
              <Link href={`/update-catalogue/${item.id}`} className="px-6 py-2 mr-2  border border-gray-600 text-gray-600 rounded-md hover:bg-gray-700 hover:text-gray-200 border border-gray-600 hover:border-gray-700 transition duration-300 ease-in-out">Ubah</Link>
              <button onClick={handleButtonClick} className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:text-white border border-red-500 hover:border-red-600 transition duration-300 ease-in-out">Hapus</button>
              {/* <button className="rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
                Pilih Jadwal
              </button> */}
            </div>
          </div>
        </div>
      ))}
      {/* <ReactModal isOpen={isOpen} onRequestClose={handleButtonClick}>
        <h2>Dialog Box Title</h2>
        <p>Dialog Box Content</p>
      </ReactModal> */}
    </>
  );
}
