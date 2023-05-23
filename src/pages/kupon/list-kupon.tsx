import { api } from "~/utils/api";
import Link from "next/link";
import { useState } from "react";
import { Kupon } from "@prisma/client";
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
  const { data, isLoading, error } = api.kupon.getAllKupon.useQuery();

  const [selected, setSelected] = useState<Kupon | undefined>(undefined);

  const [open, setOpen] = useState(false);

  const handleDeleteButton = (item: Kupon) => {
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

      <h1 className="my-8 text-center text-3xl font-bold">Daftar Kupon</h1>

      <div className="mb-4 flex justify-end">
        <Link
          href="/kupon/create-kupon"
          className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]"
        >
          + Buat Kupon
        </Link>
      </div>

      <div className="m-5 overflow-x-auto relative z-0">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>Nama Kupon</th>
              <th>Kode</th>
              <th>Diskon</th>
              <th>Batas Pemakaian</th>
              <th>Digunakan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={item.id}>
                <th>{item.nama}</th>
                <td>{item.kode}</td>
                <td>{item.diskon}%</td>
                <td>{item.kuotaPemakaian}</td>
                <td>{item.kuotaTerpakai}</td>
                <td>
                  {new Date(item.tanggal) >=
                  new Date(new Date().setHours(0, 0, 0, 0))
                    ? "Sedang Berjalan"
                    : "Telah Berakhir"}
                </td>
                <td className="flex items-center">
                  <Link href={`/kupon/ubah/${item.id}`}>
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
