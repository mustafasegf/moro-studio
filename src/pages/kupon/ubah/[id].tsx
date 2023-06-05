import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { createSSG } from "~/server/SSGHelper";
import { ParsedUrlQuery } from "querystring";
import { LoadingPage } from "~/component/loading";

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
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [diskon, setDiskon] = useState(0.0);
  const [kuotaPemakaian, setKuotaPemakaian] = useState(0);
  const [tanggal, setTanggal] = useState(new Date());

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

  const { data, isLoading, error } = api.kupon.getKuponById.useQuery({ id });

  useEffect(() => {
    if (data) {
      setNama(data.nama);
      setKode(data.kode);
      setDiskon(data.diskon);
      setKuotaPemakaian(data.kuotaPemakaian);
      setTanggal(data.tanggal);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdateKupon = (e: FormEvent) => {
    e.preventDefault();
    updateKupon.mutate({
      id,
      nama,
      kode,
      diskon,
      kuotaPemakaian,
      tanggal,
    });
  };

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

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">Ubah Kupon</h1>

      <div className="flex w-full flex-wrap py-4 px-4 sm:px-6 lg:px-8">
        <form className="w-full" onSubmit={handleUpdateKupon}>
          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="nama-kupon"
                className="block text-sm font-medium leading-6"
              >
                Nama Kupon
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={nama}
                type="text"
                name="nama-kupon"
                id="nama-kupon"
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset  ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="kode-kupon"
                className="block text-sm font-medium leading-6"
              >
                Kode Kupon
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={kode}
                type="text"
                name="kode-kupon"
                id="kode-kupon"
                disabled
                className="mt-2 block w-full rounded-md border-0 bg-light-grey bg-opacity-50 py-1.5 px-2.5 shadow-sm ring-1 ring-inset ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setKode(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="diskon"
                className="block text-sm font-medium leading-6"
              >
                Diskon
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <label className="input-group-md input-group">
                <input
                  value={diskon}
                  type="number"
                  min={1}
                  name="diskon"
                  id="diskon"
                  disabled
                  className="mt-2 input h-9 w-full ring-1 bg-light-grey bg-opacity-50 ring-dark-grey"
                  onChange={(e) => setDiskon(parseFloat(e.target.value))}
                />
                <span className="mt-2 ring-1 ring-dark-grey">%DISKON</span>
              </label>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="kuota"
                className="block text-sm font-medium leading-6"
              >
                Kuota Pemakaian
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={kuotaPemakaian}
                type="number"
                min={1}
                name="kuota"
                id="kuota"
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset ring-dark-grey focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setKuotaPemakaian(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 px-6 md:grid-cols-8">
            <div className="col-span-2 flex items-center">
              <label
                htmlFor="tanggal"
                className="block text-sm font-medium leading-6"
              >
                Tanggal Kadaluarsa
              </label>
            </div>
            <div className="col-span-3 flex items-center">
              <input
                value={new Date(tanggal).toISOString().substr(0, 10)}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                name="tanggal"
                id="tanggal"
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                onChange={(e) => setTanggal(new Date(e.target.value))}
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
