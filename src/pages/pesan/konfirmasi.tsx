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
  if (!data) {
    return 
  }

  const date = new Date(dateStr);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddBookingSchema>({
    resolver: zodResolver(addBookingSchema),
    defaultValues: {
      tanggal: date,
      katalog: data
    }
  });

  const addBooking = api.booking.addBooking.useMutation()

  function onSubmit(val: AddBookingSchema) {
    addBooking.mutate(val);
  }

  return (
    <>
      <CenterContainer>
        <div className="flex justify-center">
          <form
            className="max-w-lg grow rounded-3xl bg-base-200 p-8"
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
                <span className={cn("mb-4", { "text-error": errors.instagram })}>
                  {errors.instagram.message}
                </span>
              )}
            </div>


            <div className="mb-4">
              <label
                htmlFor="jumlah"
                className="block text-sm font-medium leading-6"
              >
                Jumlah Orang
              </label>
              <input
                type="number"
                id="jumlah"
                min={1}
                inputMode="numeric"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.jumlah }
                )}
                {...register("jumlah", { setValueAs: (v) => !v ? 0 : parseInt(v, 10), })}  
              />
              {errors.jumlah && (
                <span className={cn("mb-4", { "text-error": errors.jumlah })}>
                  {errors.jumlah.message}
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
              <input
                type="text"
                id="warna"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.warna }
                )}
                {...register("warna")}  
              />
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
                className="input-bordered input mt-1 mb-4 w-full max-w-xs"
                {...register("peliharaan", { setValueAs: (v) => v === "true"})}
              >
                <option value="false">tidak</option>
                <option value="true">ya</option>
              </select>
              {errors.peliharaan && (
                <span className={cn("mb-4", { "text-error": errors.peliharaan })}>
                  {errors.peliharaan.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="voucher"
                className="block text-sm font-medium leading-6"
              >
               Voucher 
              </label>
              <input
                type="text"
                id="voucher"
                className={cn(
                  "input-bordered input mt-1 mb-2 w-full max-w-md",
                  { "input-error": errors.voucher }
                )}
                {...register("voucher")}  
              />
              {errors.voucher && (
                <span className={cn("mb-4", { "text-error": errors.voucher })}>
                  {errors.voucher.message}
                </span>
              )}
            </div>
            <input type="hidden" {...register(`tanggal`, { valueAsDate: true })} />
            <input type="hidden" {...register(`katalog`)} />

            <input className="btn btn-primary mt-4" type="submit" value="kirim" />
          </form>
        </div>
      </CenterContainer>
    </>
  );
}
