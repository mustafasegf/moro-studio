import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { createSSG } from "~/server/SSGHelper";
import { ParsedUrlQuery } from "querystring";
import { LoadingPage } from "~/component/loading";
import { cp } from "fs";

interface Query extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }

  const { id } = ctx.query;

  if (typeof id !== "string") {
    return { redirect: { destination: "/kupon/list-kupon" } };
  }

  const ssg = createSSG();
  await ssg.kupon.getKuponById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default function UpdateKupon(props: { id: string }) {
  const [userId, setUserId] = useState("");
  const [katalogId, setKatalogId] = useState("");
  const [backgroundWarna, setBackgroundWarna] = useState("");
  const [status, setStatus] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(0);
  const [jadwal, setJadwal] = useState(new Date());

  const updateKupon = api.kupon.updateKupon.useMutation();
  const router = useRouter();
  const { id } = props;

  useEffect(
    function () {
      if (updateKupon.isSuccess) {
        void router.push("/kupon/list-kupon");
      }
    },
    [updateKupon.isSuccess]
  );

  const { data, isLoading, error } = api.detailPemesanan.getPemesananById.useQuery({ id });

  useEffect(() => {
    if (data) {
      setUserId(data.userId);
      setKatalogId(data.katalogId);
      setBackgroundWarna(data.backgroundWarna);
      setStatus(data.status);
      setJumlahOrang(data.jumlahOrang);
      setJadwal(data.jadwal);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const handleUpdateKupon = (e: FormEvent) => {
  //   e.preventDefault();
  //   updateKupon.mutate({
  //     id,
  //     nama,
  //     kode,
  //     diskon,
  //     kuotaPemakaian,
  //     tanggal,
  //   });
  // };

  return (
    <>
      {updateKupon.isSuccess && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Kupon telah berhasil diubah</span>
          </div>
        </div>
      )}

      {updateKupon.error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Kupon tidak dapat diubah.</span>
          </div>
        </div>
      )}

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">Detail Pemesanan</h1>

      <div className="flex w-full flex-wrap py-4 px-4 sm:px-6 lg:px-8">
        <form className="w-full">
          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                ID Booking
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={id}
                type="text"
                name="id-booking"
                id="id-booking"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Nama Pemesan
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={userId}
                type="text"
                name="nama-pemesan"
                id="nama-pemesan"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Jumlah Orang
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={jumlahOrang}
                type="text"
                name="nama-pemesan"
                id="nama-pemesan"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Katalog
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={katalogId}
                type="text"
                name="nama-pemesan"
                id="nama-pemesan"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Warna Background
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={backgroundWarna}
                type="text"
                name="nama-pemesan"
                id="nama-pemesan"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Status
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={status}
                type="text"
                name="nama-pemesan"
                id="nama-pemesan"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 ml-2 flex items-center">
              <label
                htmlFor="tanggal"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Jadwal
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={new Date(jadwal).toISOString().substr(0, 10)}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                name="tanggal"
                id="tanggal"
                className="focus:shadow-outline text-gray-700 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                disabled
              />
            </div>
          </div>

          <div className="mt-4 flex w-full flex-wrap py-4 px-6 sm:px-6">
            <Link
              href="/kupon/list-kupon"
              type="button"
              className="mb-2 inline-flex w-full justify-center rounded-md bg-light-grey px-3 py-2 text-sm font-semibold text-black transition duration-300 ease-in-out hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-28"
            >
              Kembali
            </Link>
            <button
              type="submit"
              className="mb-2 inline-flex w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-28"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
