import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { ModalAction } from "~/component/modal";
import makeToast from "~/component/toast";
import { api } from "~/utils/api";
import { useAuth } from "~/utils/session";

export default function ListAksesFoto() {
  const [open, setOpen] = useState(false);
  const [idFoto, setIdFoto] = useState("");
  const { session } = useAuth();
  const { data: images, refetch } = api.aksesFoto.getAllFoto.useQuery()
  const deleteImage = api.aksesFoto.deleteFoto.useMutation();

  const utils = api.useContext();
  const deleteFotoMutation = api.aksesFoto.deleteFoto.useMutation({
    onSuccess() {
      void utils.aksesFoto.getAllFoto.invalidate();
    },
  });

  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({ id })
    refetch()
  }

  async function handleDownload(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlObject;
    link.download = 'morostudio.jpg'; // Provide a desired file name
    link.click();
    window.URL.revokeObjectURL(urlObject);
  }


  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Foto</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/aksesfoto/create">
          <button className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]">
            + Tambah Foto
          </button>
        </Link>
      </div>

      <div className="flex flex-col w-full border-opacity-50">
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-4 sm:px-6 lg:px-8">
          {images && (
            images.map(image => (
              <div key={image.id} className="flex flex-col justify-center gap-2">
                <img className="max-h-72 object-contain" src={image.url} />
                {(session?.role === 'admin' || session?.role === 'studioManager') && (
                  <button className="btn btn-error" onClick={() => handleDelete(image.id)}>Hapus</button>
                )}
                <button className="btn btn-primary" onClick={() => handleDownload(image.url)}>Unduh</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
