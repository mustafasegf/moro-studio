import { api } from "~/utils/api";
import Link from "next/link";
import { useState } from "react";
import { Booking } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession, useAuth } from "~/utils/session";
import { createSSG } from "~/server/SSGHelper";
import { GrCircleInformation } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { ModalAction } from "~/component/modal";
import { LoadingPage } from "~/component/loading";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  return { props: {} };
}

export default function ListPemesanan() {
  const { data, isLoading, error } =
    api.detailPemesanan.getAllPemesanan.useQuery();
  const booking = api.detailPemesanan.getAllPemesananByUserId.useQuery();
  const { session } = useAuth();
  const [selected, setSelected] = useState<Booking | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleDeleteButton = (item: Booking) => {
    setSelected(item);
    setOpen(true);
  };

  const utils = api.useContext();
  const deleteKupon = api.kupon.deleteKupon.useMutation({
    onSuccess() {
      void utils.kupon.getAllKupon.invalidate();
    },
  });

  function deleteHandler() {
    if (!selected) return;
    deleteKupon.mutate({ id: selected.id });
    setOpen(false);
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function generateTable() {
    if (session?.role === "user") {
      return data
        ?.filter((item) => item.user.id === session?.id)
        .map((item, i) => (
          <tr key={item.id}>
            <td
              className={
                i % 2 === 0
                  ? "bg-white-grey bg-opacity-50"
                  : "bg-light-grey bg-opacity-40"
              }
            >
              {item.id}
            </td>
            <td
              className={
                i % 2 === 0
                  ? "bg-white-grey bg-opacity-50"
                  : "bg-light-grey bg-opacity-40"
              }
            >
              {item.user.nama}
            </td>
            <td
              className={
                i % 2 === 0
                  ? "bg-white-grey bg-opacity-50"
                  : "bg-light-grey bg-opacity-40"
              }
            >
              {item.jadwal.toDateString()}
            </td>
            <td
              className={
                i % 2 === 0
                  ? "bg-white-grey bg-opacity-50"
                  : "bg-light-grey bg-opacity-40"
              }
            >
              {item.jumlahOrang}
            </td>
            <td
              className={
                i % 2 === 0
                  ? "bg-white-grey bg-opacity-50"
                  : "bg-light-grey bg-opacity-40"
              }
            >
              {item.status}
            </td>
            <td
              className={`flex items-center ${
                i % 2 === 0
                  ? "bg-white-grey bg-opacity-50"
                  : "bg-light-grey bg-opacity-40"
              }`}
            >
              <Link href={`/detailpemesanan/${item.id}`}>
                <GrCircleInformation className="mr-2 text-2xl" />
              </Link>
            </td>
          </tr>
        ));
    } else {
      return data?.map((item, i) => (
        <tr key={item.id}>
          <td
            className={
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }
          >
            {item.id}
          </td>
          <td
            className={
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }
          >
            {item.user.nama}
          </td>
          <td
            className={
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }
          >
            {item.jadwal.toDateString()}
          </td>
          <td
            className={
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }
          >
            {item.jumlahOrang}
          </td>
          <td
            className={
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }
          >
            {item.status}
          </td>
          <td
            className={
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }
          >
            {item.fotoUser.length}
          </td>
          <td
            className={`flex items-center ${
              i % 2 === 0
                ? "bg-white-grey bg-opacity-50"
                : "bg-light-grey bg-opacity-40"
            }`}
          >
            <Link href={`/detailpemesanan/${item.id}`}>
              <GrCircleInformation className="mr-2 text-2xl" />
            </Link>
          </td>
        </tr>
      ));
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <h1 className="my-8 text-center text-3xl font-bold">
          Daftar Pemesanan
        </h1>

        <div className="relative z-0 m-5 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <td className="bg-light-grey bg-opacity-80 text-base normal-case">
                  ID Booking
                </td>
                <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                  Nama Pemesan
                </th>
                <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                  Jadwal
                </th>
                <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                  Jumlah Orang
                </th>
                <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                  Status
                </th>
                <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                  Jumlah Foto
                </th>
                <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>{generateTable()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
