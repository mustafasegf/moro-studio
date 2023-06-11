import { GetServerSidePropsContext } from "next/types";
import { CenterContainer } from "~/component/centercontainer";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { format, isAfter, getDay } from "date-fns";
import cn from "classnames";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addBookingSchema, AddBookingSchema } from "~/utils/schemas";
import { LoadingPage } from "~/component/loading";
import { useEffect } from "react";
import { useRouter } from "next/router";
import makeToast from "~/component/toast";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  const { katalog, date } = ctx.query;

  if (typeof katalog !== "string") {
    return { redirect: { destination: "/pesan" } };
  }

  if (typeof date !== "string") {
    return { redirect: { destination: `/pesan/jadwal?katalog=${katalog}` } };
  }

  const now = new Date();
  const dateObj = new Date(date);
  if (isAfter(now, dateObj)) {
    return { redirect: { destination: `/pesan/jadwal?katalog=${katalog}` } };
  }

  const data = await ssg.catalogue.getCatalogueById.fetch({ id: katalog });
  if (!data) {
    return { redirect: { destination: "/pesan" } };
  }
  await ssg.booking.getAllBackground.prefetch()

  return {
    props: {
      katalog,
      dateStr: date,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function Jadwal({
  katalog,
  dateStr,
}: Record<"katalog" | "dateStr", string>) {
  const { data } = api.catalogue.getCatalogueById.useQuery({ id: katalog });
  const router = useRouter()
  if (!data) {
    return;
  }

  const { data:backgrounds } = api.booking.getAllBackground.useQuery()

  const date = new Date(dateStr);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddBookingSchema>({
    resolver: zodResolver(addBookingSchema),
    defaultValues: {
      tanggal: date,
      katalog: data,
      jumlahOrang: data.jumlahOrang ?? undefined,
    },
  });

  const addBooking = api.booking.addBooking.useMutation();

  useEffect(
    function() {
      if (addBooking.isSuccess) {
        makeToast("pesanan berhasil ditambah")
        const timeout = setTimeout(() => {
          void router.push("/user");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [addBooking.isSuccess]
  );

  useEffect(
    function() {
      if (addBooking.isError) {
        makeToast(`Eror: ${addBooking.error.message}`, {type: "error"})
        const timeout = setTimeout(() => {
          addBooking.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addBooking.isError]
  );

  function onSubmit(val: AddBookingSchema) {
    addBooking.mutate(val);
  }

  return (
    <>
      <CenterContainer>
        <div className="flex justify-center">
          <form
            className="max-w-lg mt-4 mb-8 grow rounded-3xl bg-grey bg-opacity-20 p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-medium leading-6"
              >
                Nama
              </label>
              <input
                type="text"
                id="nama"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.nama }
                )}
                {...register("nama")}
              />
              {errors.nama && (
                <span className={cn("mb-4", { "text-error": errors.nama })}>
                  {errors.nama.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.email }
                )}
                {...register("email")}
              />
              {errors.email && (
                <span className={cn("mb-4", { "text-error": errors.email })}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="hp"
                className="block text-sm font-medium leading-6"
              >
                Hp
              </label>
              <input
                type="text"
                id="hp"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.hp }
                )}
                {...register("hp")}
              />
              {errors.hp && (
                <span className={cn("mb-4", { "text-error": errors.hp })}>
                  {errors.hp.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="instagram"
                className="block text-sm font-medium leading-6"
              >
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.instagram }
                )}
                {...register("instagram")}
              />
              {errors.instagram && (
                <span
                  className={cn("mb-4", { "text-error": errors.instagram })}
                >
                  {errors.instagram.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="jumlahOrang"
                className="block text-sm font-medium leading-6"
              >
                Jumlah Orang
              </label>
              <input
                disabled={!!data.jumlahOrang}
                defaultValue={data.jumlahOrang ?? undefined}
                type="number"
                id="jumlahOrang"
                min={1}
                inputMode="numeric"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.jumlahOrang }
                )}
                {...register("jumlahOrang", {
                  setValueAs: (v) => (!v ? 0 : parseInt(v, 10)),
                })}
              />
              {errors.jumlahOrang && (
                <span
                  className={cn("mb-4", { "text-error": errors.jumlahOrang })}
                >
                  {errors.jumlahOrang.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="warna"
                className="block text-sm font-medium leading-6"
              >
                Warna Background Dan Preset Foto
              </label>
              <select
                id="warna"
                className="input-bordered input mt-1 mb-4 w-full max-w-md"
                {...register("warna")}
              >
                {backgrounds?.map(({warna}) => <option key={warna} value={warna}>{warna}</option>)}
              </select>
              {errors.warna && (
                <span className={cn("mb-4", { "text-error": errors.warna })}>
                  {errors.warna.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="peliharaan"
                className="block text-sm font-medium leading-6"
              >
                Saya datang dengan hewan peliharaan (hewan kecil)
              </label>
              <select
                id="peliharaan"
                className="input-bordered input mt-1 mb-4 w-full max-w-md"
                {...register("peliharaan", { setValueAs: (v) => v === "true" })}
              >
                <option value="false">Tidak</option>
                <option value="true">Ya</option>
              </select>
              {errors.peliharaan && (
                <span
                  className={cn("mb-4", { "text-error": errors.peliharaan })}
                >
                  {errors.peliharaan.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="kupon"
                className="block text-sm font-medium leading-6"
              >
                Kupon
              </label>
              <input
                type="text"
                id="kupon"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.kupon }
                )}
                {...register("kupon")}
              />
              {errors.kupon && (
                <span className={cn("mb-4", { "text-error": errors.kupon })}>
                  {errors.kupon.message}
                </span>
              )}
            </div>
            <input
              type="hidden"
              {...register(`tanggal`, { valueAsDate: true })}
            />
            <input type="hidden" {...register(`katalog`)} />

            <input
              className="mt-4 h-10 rounded-3xl inline-flex w-full justify-center bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-28"
              type="submit"
              value="Kirim"
            />
          </form>
          {addBooking.isLoading && <LoadingPage />}
        </div>
      </CenterContainer>
    </>
  );
}
