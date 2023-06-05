import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession, useAuth } from "~/utils/session";
import { createSSG } from "~/server/SSGHelper";
import { ParsedUrlQuery } from "querystring";
import { LoadingPage } from "~/component/loading";
import {
  format,
  addDays,
  eachDayOfInterval,
  set,
  addMinutes,
  isAfter,
  setMinutes,
  setHours,
  getDay,
  differenceInMinutes,
  differenceInDays,
  getMinutes,
  getHours,
} from "date-fns";
import { id, enUS } from "date-fns/locale";

interface Query extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
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

export default function DetailPemesanan(props: { id: string }) {
  const [namaUser, setNamaUser] = useState("");
  const [namaKatalog, setNamaKatalog] = useState("");
  const [backgroundWarna, setBackgroundWarna] = useState("");
  const [status, setStatus] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(0);
  const [jadwal, setJadwal] = useState(new Date());

  const { id } = props;

  const { data, isLoading, error } = api.detailPemesanan.getPemesananById.useQuery({ id });

  useEffect(() => {
    if (data) {
      setNamaUser(data.user.nama);
      setNamaKatalog(data.katalog.nama);
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

  return (
    <>
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
                value={namaUser}
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
                value={namaKatalog}
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
                // value={new Date(jadwal).toISOString().substr(0, 16)}
                value={format(jadwal, "dd/MM/yyyy hh:mm aa", {locale: enUS,})}
                name="tanggal"
                id="tanggal"
                className="text-gray-900 focus:ring-indigo-600 mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          <div className="mt-4 flex w-full flex-wrap py-4 px-6 sm:px-6">
            <Link
              href="/detailpemesanan"
              type="button"
              className="mb-2 inline-flex w-full justify-center rounded-md bg-light-grey px-3 py-2 text-sm font-semibold text-black transition duration-300 ease-in-out hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-28"
            >
              Kembali
            </Link>
            <Link
              href={`/aksesfoto/list/${id}`}
              type="button"
              className="mb-2 inline-flex w-full justify-center rounded-md bg-light-grey px-3 py-2 text-sm font-semibold text-black transition duration-300 ease-in-out hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-28"
            >
              Daftar Foto
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
