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
  const { data: images, refetch } = api.image.getAllImages.useQuery()
  const deleteImage = api.image.deleteImage.useMutation();

  // const [dividers, setDividers] = useState<JSX.Element[]>([]);
  // const [titles, setTitles] = useState<string[]>([]);

  const utils = api.useContext();
  const deleteFotoMutation = api.aksesFoto.deleteFoto.useMutation({
    onSuccess() {
      void utils.aksesFoto.getAllFoto.invalidate();
    },
  });

  // async function deleteHandler(id: string) {
  //   if (idFoto) {
  //     deleteFotoMutation.mutate({ id: idFoto });
  //   }
  //   // await deleteFotoMutation.mutateAsync({ id })
  //   refetch()
  //   setOpen(false);
  // }

  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({ id })
    refetch()
  }

  // function openModal(id: string) {
  //   setIdFoto(id);
  //   setOpen(true);
  // }

  // useEffect(
  //   function () {
  //     if (deleteFotoMutation.isSuccess) {
  //       makeToast("Foto berhasil dihapus", { duration: 5000 })
  //       const timeout = setTimeout(() => {
  //         deleteFotoMutation.reset();
  //       }, 5000);
  //       return () => clearTimeout(timeout);
  //     }
  //   },
  //   [deleteFotoMutation.isSuccess]
  // );

  // useEffect(
  //   function () {
  //     if (deleteFotoMutation.isError) {
  //       makeToast(`Error: ${deleteFotoMutation.error.message}`, { type: "error" })
  //       const timeout = setTimeout(() => {
  //         deleteFotoMutation.reset();
  //       }, 5000);
  //       return () => clearTimeout(timeout);
  //     }
  //   },
  //   [deleteFotoMutation.isError]
  // );

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

  // function createDivider() {
  //   setDividers((prevDividers) => [...prevDividers, <div className="divider"></div>]);
  //   setTitles((prevTitles) => [...prevTitles, '']);
  // }

  // function handleTitleChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
  //   const newTitles = [...titles];
  //   newTitles[index] = event.target.value;
  //   setTitles(newTitles);
  // }


  return (
    <>
      {/* {images && (
        images.map(image => (
          <ModalAction
            isDelete
            open={open}
            title="Delete Foto"
            content="Apakah Anda yakin akan menghapus foto ini?"
            onClose={() => setOpen(false)}
            kembaliHandler={() => setOpen(false)}
            actionHandler={() => deleteHandler(image.id)}
          />
        ))
      )} */}
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
                {session?.role === 'user' && (
                  <button className="rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey" onClick={() => handleDelete(image.id)}>Hapus</button>
                  // <button
                  //   className="btn btn-error"
                  //   onClick={() => openModal(image.id)}>
                  //   Hapus
                  // </button>
                )}
                <button className="border rounded-3xl bg-blue px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-[#6380BB]" onClick={() => handleDownload(image.url)}>Unduh</button>
              </div>
            ))
          )}
        </div>

        {/* {dividers.map((divider, index) => (
          <React.Fragment key={index}>
            {divider}
            <input
              type="text"
              className="input input-primary mt-2"
              placeholder="Enter Title"
              value={titles[index]}
              onChange={(event) => handleTitleChange(index, event)}
            />
            {images && (
              <div className="mb-4 flex justify-end">
                <Link href="/create-aksesfoto">
                  <button className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]">
                    + Tambah Foto
                  </button>
                </Link>
              </div>
            )}
          </React.Fragment>
        ))} */}
        {/* <button
          className="btn btn-primary"
          onClick={createDivider}
        >
          Add Divider
        </button> */}
        {/* <div className="divider"></div>
        <h1 className="my-8 text-3xl font-bold">15/04/2023</h1> */}
      </div>
    </>
  );
}
