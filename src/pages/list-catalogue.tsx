import { api } from "~/utils/api";
import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";
import Link from "next/link";
import { useRef, useState } from "react";
import { Dialog } from "../components/dialog";
import { useOnClickOutside } from "usehooks-ts";
import cn from "classnames";
import { MdDelete } from "react-icons/md";
import { Katalog } from "@prisma/client";

export default function ListCatalogue() {
  const { data, isLoading, error, refetch } =
    api.catalogue.getAllCatalogue.useQuery();

  const [selected, setSelected] = useState<Katalog | undefined>(undefined);

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteButton = (item: Katalog) => {
    setSelected(item);
    setIsOpen(true);
  };

  const deleteCatalogue = api.catalogue.deleteCatalogue.useMutation();

  function onDelete() {
    if (!selected) return;
    deleteCatalogue.mutate({id: selected.id })
    refetch();
    setIsOpen(false);
  }

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

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex min-h-screen items-center justify-center bg-neutral-600 bg-opacity-10 px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>

          <div
            className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mb-4 flex items-center">
                  <MdDelete className="text-2xl text-gray-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-headline"
                  >
                    Hapus Katalog
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-500">
                      Apakah Anda yakin akan menghapus katalog ini?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={onDelete}
              >
                Hapus
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {data?.map((item, i) => (
        <div
          key={item.id}
          className="mx-4 my-6 rounded-lg bg-gray-200 p-6 shadow-lg md:mx-10 lg:mx-20"
        >
          <h1>id {item.id}</h1>
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
                onClick={() => handleDeleteButton(item)}
                className="rounded-md border border-red-500 bg-red-500 px-6 py-2 text-white transition duration-300 ease-in-out hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                Hapus
              </button>
              {/* <Dialog
                title="Hapus Katalog"
                content="Apakah Anda yakin akan menghapus katalog ini?"
                id={item.id}
                isOpen={isOpen}
                w={(i + 1) * 400}
                onClose={toggleDialog}
                onDelete={() => onDelete(item.id)}
              /> */}

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

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose(): void;
};

const Modal = ({ children, open, onClose }: Props) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    onClose();
  });

  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  return (
    <div className={modalClass}>
      <div className="modal-box" ref={ref}>
        {children}
      </div>
    </div>
  );
};
