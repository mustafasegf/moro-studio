import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { ModalAction } from "~/component/modal";
import makeToast from "~/component/toast";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { getServerAuthSession, useAuth } from "~/utils/session";

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function ListAksesFoto() {
  const [open, setOpen] = useState(false);
  const [idFoto, setIdFoto] = useState("");
  const { session } = useAuth();
  const deleteImage = api.aksesFoto.deleteFoto.useMutation();
  const router = useRouter();
  const { id } = router.query as Query;

  const { data: images, refetch } = api.aksesFoto.getAllFotoByBookingId.useQuery({ id })

  const utils = api.useContext();
  const deleteFotoMutation = api.aksesFoto.deleteFoto.useMutation({
    onSuccess() {
      void utils.aksesFoto.getAllFoto.invalidate();
    },
  });

  async function handleDelete(id: string, bookingId: string) {
    await deleteImage.mutateAsync({ id, bookingId })
    refetch()
  }

  // async function handleDownload(url: string) {
  //   console.log(url)
  //   try {
  //     const response = await fetch(url, { mode: 'no-cors' });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch resource');
  //     }

  //     const blob = await response.blob();
  //     const urlObject = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = urlObject;
  //     link.download = 'morostudio.jpg'; // Provide a desired file name
  //     link.click();
  //     window.URL.revokeObjectURL(urlObject);
  //   } catch (error) {
  //     console.error('Download error:', error);
  //     // Handle the error, show an error message, or perform any necessary actions
  //   }
  // }

  // async function handleDownload(url: string) {
  //   const response = await fetch(url, { mode: 'cors' });
  //   const blob = await response.blob();
  //   const urlObject = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = urlObject;
  //   link.download = 'morostudio.jpg'; // Provide a desired file name
  //   link.click();
  //   window.URL.revokeObjectURL(urlObject);
  // }

  function handleDownload(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'morostudio.jpg'; // Provide a desired file name
    link.target = '_blank'; // Open the download in a new tab/window
    link.rel = 'noopener noreferrer'; // Set link relationship attributes

    link.click();
  }


  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Foto</h1>

      <div className="mb-4 flex justify-end">
        <Link href={`/aksesfoto/${id}`}>
          {(session?.role === 'studioManager' || session?.role === 'admin')  && (
            <button className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]">
              + Tambah Foto
            </button>
          )}
        </Link>
      </div>

      <div className="flex flex-col w-full border-opacity-50">
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-4 sm:px-6 lg:px-8">
          {images && (
            images.map(image => (
              <div key={image.id} className="flex flex-col justify-center gap-2">
                <img className="max-h-72 object-contain" src={image.url} />
                {(session?.role === 'admin' || session?.role === 'studioManager') && (
                  <button className="btn btn-error" onClick={() => handleDelete(image.id, id)}>Hapus</button>
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
