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
    return <LoadingPage />;
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
          className="mx-4 my-6 rounded-lg bg-grey bg-opacity-20 p-6 shadow-lg md:mx-10 lg:mx-20"
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
                <BiTimeFive className="mr-2 text-2xl" />
                <span>
                  {item.durasi > 60 && Math.floor(item.durasi / 60) + " Jam "}
                  {(item.durasi % 60) + " Menit"}
                </span>
              </div>
              <div className="mb-4 flex items-center">
                <IoIosPricetag className="mr-2 text-2xl" />
                <span>
                  {item.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              {item.jumlahOrang && (
                <div className="flex items-center">
                  <IoMdPeople className="mr-2 text-2xl" />
                  <span>{item.jumlahOrang} orang</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="mr-2 inline-block">
                <Link
                  href={`/katalog/ubah/${item.id}`}
                  className="h-10 rounded-md border border-dark-grey px-6 py-2 transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey"
                >
                  Ubah
                </Link>
              </div>
              <button
                onClick={() => handleDeleteButton(item)}
                className="h-10 rounded-md border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
