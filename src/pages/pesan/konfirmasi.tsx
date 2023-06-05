import { GetServerSidePropsContext } from "next/types";
import { CenterContainer } from "~/component/centercontainer";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import {
  format,
  addDays,
  eachDayOfInterval,
  set,
  addMinutes,
  isAfter,
  setHours,
  getDay,
  differenceInDays,
  getMinutes,
  getHours,
} from "date-fns";
import { id, enUS } from "date-fns/locale";
import cn from "classnames";
import Link from "next/link";
import { getServerAuthSession } from "~/utils/session";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  Booking,
  Katalog,
  BookinStatus,
  Pembayaran,
  Kupon,
} from "@prisma/client";
import { Modal, ModalAction } from "~/component/modal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPembayaranSchema, AddPembayaranSchema } from "~/utils/schemas";
import makeToast from "~/component/toast";
import dynamic from 'next/dynamic';

const hoverIndexAtom = atom(-1);
const bookSetAtom = atom<Set<number>>(new Set<number>());
const bookAtom = atom<
  | (Booking & {
      katalog: Katalog;
      Pembayaran: Pembayaran[];
      kupon: Kupon | null;
    })
  | undefined
>(undefined);
const isOpenAtom = atom(false);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);

  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "studioManager" && session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }

  const ssg = createSSG();

  const startHour = 10;
  const endHour = 21;
  const start = set(new Date(), {
    hours: startHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const end = setHours(addDays(start, 6), endHour);

  await ssg.booking.getAllBooking.prefetch({
    from: start,
    to: end,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}


const DynamicJawal = dynamic(() => import("~/pages/pesan/konfirmasi").then(module => module.Jadwal) , {ssr: false})

export default DynamicJawal


export function Jadwal() {
  const startHour = 10;
  const endHour = 21;
  const duration = 40;
  const interval = Math.ceil(((endHour - startHour) * 60) / duration);

  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [booking] = useAtom(bookAtom);

  const start = set(new Date(), {
    hours: startHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const end = setHours(addDays(start, 6), endHour);

  const dates = eachDayOfInterval({
    start,
    end,
  }).map((d) => setHours(d, startHour));
  const [book, setBook] = useState<
    Record<
      number,
      Booking & {
        katalog: Katalog;
        Pembayaran: Pembayaran[];
        kupon: Kupon | null
      }
    >
  >({});
  const [bookSet, setBookSet] = useAtom(bookSetAtom);

  const { data: listBooking } = api.booking.getAllBooking.useQuery({
    from: start,
    to: end,
  });

  const utils = api.useContext();
  const deleteBooking = api.booking.deleteBooking.useMutation({
    onSuccess() {
      utils.booking.getAllBooking.invalidate();
    },
  });

  useEffect(() => {
    listBooking?.forEach((booking) => {
      const row = differenceInDays(booking.jadwal, start);
      const col =
        (getHours(booking.jadwal) * 60 +
          getMinutes(booking.jadwal) -
          startHour * 60) /
        40;

      for (let i = 0; i < booking.katalog.durasi / 40; i++) {
        // console.log(row, col, booking)
        const idx = row * interval + col + i;
        book[idx] = booking;
        bookSet.add(idx);
      }
    });

    setBookSet(bookSet);
    setBook(book);
  }, [bookSet]);

  function handleAction() {
    setIsOpenDelete(false);
    const id = booking?.id!;
    deleteBooking.mutate({ id });
  }

  useEffect(
    function () {
      if (deleteBooking.isSuccess) {
        makeToast("pesanan berhasil dihapus");
        setIsOpen(false);
        setIsOpenDelete(false);
      }
    },
    [deleteBooking.isSuccess]
  );

  useEffect(
    function () {
      if (deleteBooking.isError) {
        makeToast(`Eror: ${deleteBooking.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          deleteBooking.reset();
          setIsOpenDelete(false);
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deleteBooking.isError]
  );

  return (
    <>
      <ModalBooking
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={() => setIsOpenDelete(true)}
      />

      <ModalAction
        open={isOpenDelete}
        isDelete
        title="Hapus Pesanan"
        content="Apakah anda yakin ingin menghapus pesanan ini?"
        onClose={() => setIsOpenDelete(false)}
        kembaliHandler={() => setIsOpenDelete(false)}
        actionHandler={handleAction}

      />
      <CenterContainer>
        <div className=" flex flex-row justify-between">
          {dates.map((date, rowIdx) => (
            <div
              key={date.toISOString()}
              className="mt-4 mb-8 rounded-xl py-3 px-4 text-center text-lg"
            >
              <p className="text-center text-lg font-bold">
                {format(date, "eeee", { locale: id })}
              </p>
              <p className="text-center text-2xl font-bold">
                {format(date, "dd")}
              </p>
              {[...Array(interval)].map((_, colIdx) => (
                <DatesButton
                  key={colIdx}
                  idx={rowIdx * interval + colIdx}
                  date={addMinutes(date, colIdx * 40)}
                  booking={book[rowIdx * interval + colIdx]}
                />
              ))}
            </div>
          ))}
        </div>
      </CenterContainer>
    </>
  );
}

interface DatesButtonProps {
  idx: number;
  date: Date;
  booking?: Booking & {
    katalog: Katalog;
    Pembayaran: Pembayaran[];
    kupon: Kupon | null
  };
}

function DatesButton({ date, idx, booking }: DatesButtonProps) {
  const [hoverIndex, setHoverIndex] = useAtom(hoverIndexAtom);
  const [booked] = useAtom(bookSetAtom);
  const interval = 17;
  const [, setBook] = useAtom(bookAtom);
  const [, setIsOpen] = useAtom(isOpenAtom);

  const enabled = !!booking;

  const range = (booking?.katalog?.durasi ?? 40) / 40;
  let hover =
    idx - hoverIndex < range && idx - hoverIndex >= 0 && hoverIndex != -1;

  function handleEnter() {
    if (booked.has(idx)) {
      let i = idx;
      while (booked.has(i)) {
        i--;
      }
      setHoverIndex(i + 1);
    }
  }
  function handleLeave() {
    setHoverIndex(-1);
  }
  function handleClick() {
    if (enabled) {
      setBook(booking);
      setIsOpen(true);
    }
  }

  const Child = () => (
    <div
      className={cn(
        "mt-3 rounded-xl border-2 border-neutral-400 bg-base-100 py-3 px-2 text-center text-lg",
        {
          "-translate-y-[2px] bg-neutral-300 transition duration-75 ease-in-out":
            hover && enabled,
        },
        {
          "bg-primary": enabled,
        },
        {
          "bg-accent": booking?.status == BookinStatus.dp
        },
        {
          "bg-success": booking?.status == BookinStatus.lunas
        }
      )}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
      onClick={() => {
        handleClick();
      }}
    >
      {format(date, "hh:mm aa", {
        locale: enUS,
      })}
    </div>
  );

  if (enabled)
    return (
      <div>
        <Child />
      </div>
    );

  return <Child />;
}

interface ModalBookingProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function ModalBooking({
  open,
  onClose,
  onDelete,
}: ModalBookingProps) {
  const [booking] = useAtom(bookAtom);
  const [, setBookSet] = useAtom(bookSetAtom);
  const date = booking?.jadwal ?? new Date();
  const durasi = booking?.durasi ?? 40;
  const [status, setStatus] = useState(booking?.status ?? BookinStatus.booked);

  const utils = api.useContext();
  const addPembayaran = api.pembayaran.addPembayaran.useMutation({
    onSuccess() {
      void utils.booking.getAllBooking.invalidate();
      setBookSet(new Set());
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddPembayaranSchema>({
    resolver: zodResolver(addPembayaranSchema),
    defaultValues: {
      booking: booking?.id,
    },
  });

  useEffect(() => {
    reset({ booking: booking?.id });
  }, [booking]);

  function onLeave() {
    reset();
    onClose();
    setStatus(BookinStatus.booked);
  }

  function onSubmit(val: AddPembayaranSchema) {
    addPembayaran.mutate(val);
    // console.log(val);
  }

  useEffect(
    function() {
      if (addPembayaran.isSuccess) {
        makeToast("pesanan berhasil ditambah");
        onLeave();
      }
    },
    [addPembayaran.isSuccess]
  );

  useEffect(
    function() {
      if (addPembayaran.isError) {
        makeToast(`Eror: ${addPembayaran.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          addPembayaran.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addPembayaran.isError]
  );

  function handleChangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const statusForm = e.target.value as BookinStatus;
    setStatus(statusForm);
  }

  let bayar = booking?.Pembayaran.map((p) => p.jumlah).reduce(
    (acc, cur) => acc + cur,
    0
  ) ?? 0;

  bayar = bayar * (booking?.kupon?.diskon ?? 1)

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="z-50 overflow-y-auto">
          <div className="flex items-center py-3 px-4">
            <h3 className="text-lg font-medium">Ubah Status Booking</h3>
          </div>

          <p className="py-2 px-4">
            {format(date, "eeee d MMMM p - ", { locale: id }) +
              format(addMinutes(date, durasi), "p", { locale: id })}
          </p>
          <p className="px-4">Harga: {booking?.harga}</p>
          <p className="px-4 pb-2">Uang yang sudah terbayar: {bayar}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <select
              id="role"
              className="input-bordered input mt-1 mb-4 w-full max-w-xs"
              onChange={handleChangeStatus}
              defaultValue={booking?.status}
            >
              {Object.keys(BookinStatus).map((st) => (
                <option
                  key={st}
                  value={st}
                >
                  {st}
                </option>
              ))}
            </select>
            {(status === BookinStatus.dp || status === BookinStatus.lunas) && (
              <>
                {/* <Controller */}
                {/*   render={({ field }) => ( */}
                {/*     <NumericFormat */}
                {/*       thousandSeparator={true} */}
                {/*       // decimalSeparator={","} */}
                {/*       className={cn( */}
                {/*         "input-bordered input mt-1 mb-2 w-full max-w-xs", */}
                {/*         { "input-error": errors.jumlah } */}
                {/*       )} */}
                {/*       {...field} */}
                {/*       // @ts-ignore */}
                {/*       ref={null} */}
                {/*     /> */}
                {/*   )} */}
                {/*   control={control} */}
                {/*   name="jumlah" */}
                {/* /> */}

                <input
                  className={cn(
                    "input-bordered input mt-1 mb-2 w-full max-w-xs",
                    { "input-error": errors.jumlah }
                  )}
                  {...register(`jumlah`, {
                    setValueAs: (val) => (!val ? 0 : parseInt(val)),
                  })}
                />

                {errors.jumlah && (
                  <span className={cn("mb-4", { "text-error": errors.jumlah })}>
                    {errors.jumlah.message}
                  </span>
                )}
              </>
            )}
            <input type="hidden" {...register(`booking`)} />

            <input
              type="hidden"
              {...register(`dp`, { value: status === BookinStatus.dp })}
            />

            <div className="flex justify-end py-3 px-4">
              <button className="h-10 rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey" onClick={onDelete}>
                Hapus
              </button>
              <button className="h-10 rounded-3xl border bg-light-grey border-light-grey px-6 py-2 text-black transition duration-300 ease-in-out hover:bg-medium-grey hover:text-white-grey" onClick={onLeave}>
                Batal
              </button>
              <input className="h-10 rounded-3xl border bg-blue px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-[#6380BB] hover:text-white-grey" type="submit" value="Simpan" />
              
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
