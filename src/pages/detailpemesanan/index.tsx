import { api } from "~/utils/api";
import Link from "next/link";
import { useState } from "react";
import { Booking } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { createSSG } from "~/server/SSGHelper";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { ModalAction } from "~/component/modal";
import { LoadingPage } from "~/component/loading";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }
  const ssg = createSSG();
  await ssg.kupon.getAllKupon.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function ListKupon() {
  const { data, isLoading, error } = api.detailPemesanan.getAllPemesananan.useQuery();

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

  return (
    <>
      <ModalAction
        isDelete
        open={open}
        title="Hapus Kupon"
        content="Apakah Anda yakin akan menghapus kupon ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={deleteHandler}
      />

      <h1 className="my-8 text-center text-3xl font-bold">Daftar Pemesanan</h1>

      <div className="m-5 overflow-x-auto relative z-0">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>ID Booking</th>
              <th>Nama Pemesan</th>
              <th>Jadwal</th>
              <th>Jumlah Orang</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.user.nama}</td>
                <td>{item.jadwal.toDateString()}</td>
                <td>{item.jumlahOrang}</td>
                <td>{item.status}</td>
                <td className="flex items-center">
                  <Link href={`/detailpemesanan/${item.id}`}>
                    <BiEdit className="mr-2 text-2xl" />
                  </Link>
                  <button onClick={() => handleDeleteButton(item)}>
                    <MdDelete className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
