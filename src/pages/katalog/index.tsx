import { api } from "~/utils/api";
import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag, IoMdPeople } from "react-icons/io";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { useState } from "react";
import { Katalog } from "@prisma/client";
import { createSSG } from "~/server/SSGHelper";
import { LoadingPage } from "~/component/loading";
import { ModalAction } from "~/component/modal";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }
  const ssg = createSSG();
  await ssg.catalogue.getAllCatalogue.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function ListCatalogue() {
  const { data, isLoading, error } = api.catalogue.getAllCatalogue.useQuery();

  const [selected, setSelected] = useState<Katalog | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleDeleteButton = (item: Katalog) => {
    setSelected(item);
    setOpen(true);
  };

  const utils = api.useContext();
  const deleteCatalogue = api.catalogue.deleteCatalogue.useMutation({
    onSuccess() {
      void utils.catalogue.getAllCatalogue.invalidate();
    },
  });

  function onDelete() {
    if (!selected) return;
    deleteCatalogue.mutate({ id: selected.id });
    setOpen(false);
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Photo Catalogue</h1>

      <div className="mb-4 flex justify-end">
        <Link
          href="/katalog/tambah"
          className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]"
        >
          + Tambah Paket Foto
        </Link>
      </div>

      <ModalAction
        isDelete
        open={open}
        title="Hapus Katalog"
        content="Apakah Anda yakin akan menghapus katalog ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={onDelete}
      />

      {data?.map((item) => (
        <div
          key={item.id}
          className="mx-4 my-6 rounded-lg bg-[#e5e7eb] p-6 shadow-lg md:mx-10 lg:mx-20"
        >
          <h2 className="text-left text-lg font-bold">{item.nama}</h2>
          <div className="mt-4 rounded-md bg-light-grey p-4 text-black">
            <div className="text">
              <pre>{item.deskripsi}</pre>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="mb-4 flex items-center">
                <BiTimeFive className="mr-2 text-2xl text-gray-600" />
                <span> 
                  {item.durasi > 60 && Math.floor(item.durasi/60) + " Jam " } 
                  {item.durasi % 60 + " Menit" } 
                </span>
              </div>
              <div className="mb-4 flex items-center">
                <IoIosPricetag className="mr-2 text-2xl text-gray-600" />
                <span>
                  {item.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              {item.jumlahOrang &&
                <div className="flex items-center">
                <IoMdPeople className="mr-2 text-2xl text-gray-600" />
                  <span>{item.jumlahOrang} orang</span>
                </div>
              }
            </div>
            <div className="text-right">
              <Link
                href={`/katalog/ubah/${item.id}`}
                className="mr-2 rounded-md border border-gray-600 px-6 py-2 text-gray-600 transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey"
              >
                Ubah
              </Link>
              <button
                onClick={() => handleDeleteButton(item)}
                className="rounded-md border border-red bg-red px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white-grey"
              >
                Hapus
              </button>
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
