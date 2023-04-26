import { api } from "~/utils/api";
import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Katalog, Kupon } from "@prisma/client";
import { Modal } from "~/component/modal";

export default function ListKupon() {
  const { data, isLoading, error } = api.kupon.getAllKupon.useQuery();

  const [selected, setSelected] = useState<Kupon | undefined>(undefined);

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteButton = (item: Katalog) => {
    setSelected(item);
    setIsOpen(true);
  };

  const utils = api.useContext();
  const deleteKupon = api.kupon.deleteKupon.useMutation({
    onSuccess(input) {
      void utils.kupon.getAllKupon.invalidate();
    },
  });

  function onDelete() {
    if (!selected) return;
    deleteKupon.mutate({ id: selected.id });
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
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Kupon</h1>

      <div className="overflow-x-auto">
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
          {data?.map((item, i) => (
          <tbody key={item.id}>
            <tr>
              <th>{item.nama}</th>
              <td>{item.kode}</td>
              <td>{item.diskon}</td>
              <td>{item.kuotaPemakaian}</td>
              <td>{item.kuotaTerpakai}</td>
              <td>{item.status}</td>
              <td></td>
            </tr>
          </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
