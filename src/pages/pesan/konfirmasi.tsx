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
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Booking, Katalog } from "@prisma/client";
import { Modal } from "~/component/modal";

const hoverIndexAtom = atom(-1);
const bookSetAtom = atom<Set<number>>(new Set<number>());
const bookAtom = atom<Booking | undefined>(undefined);
const isOpenAtom = atom(false);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
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

export default function Jadwal() {
  const startHour = 10;
  const endHour = 21;
  const duration = 40;
  const interval = Math.ceil(((endHour - startHour) * 60) / duration);

  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

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
      }
    >
  >({});
  const [bookSet, setBookSet] = useAtom(bookSetAtom); 

  const { data: listBooking } = api.booking.getAllBooking.useQuery({
    from: start,
    to: end,
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
        const idx = row * interval + col + i;
        book[idx] = booking;
        bookSet.add(idx);
      }
      console.log({bookSet})
    });

    setBookSet(bookSet);
    setBook(book);
  }, [bookSet]);

  function handleKembali() {
    setIsOpen(false);
  }
  function handleAction() {
    setIsOpen(false);
  }

  return (
    <>
      <ModalAction 
        open={isOpen}
        onClose={() => setIsOpen(false)}
        kembaliHandler = {handleKembali}
        actionHandler = {handleAction}
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
                {format(date, "ee")}
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
  let hover = idx - hoverIndex < range && idx - hoverIndex >= 0 && hoverIndex != -1;

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
          "-translate-y-[2px] bg-neutral-300 transition duration-75 ease-in-out":hover && enabled,
        },
        {
          "bg-primary": enabled,
        }
      )}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
      onClick={() => { handleClick() }}
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

interface ModalActionProps {
  open: boolean;
  onClose: () => void;
  kembaliHandler: () => void;
  actionHandler: () => void;
}

export function ModalAction({
  open,
  onClose,
  kembaliHandler,
  actionHandler,
}: ModalActionProps) {
  const [booking] = useAtom(bookAtom);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="z-50 overflow-y-auto">
          <div className="flex items-center py-3 px-4">
            <h3 className="text-lg font-medium">Masukan DP pesanan</h3>
          </div>

          <p className="py-4 px-4">Masukan DP pesanan</p>
          <div className="flex justify-end py-3 px-4">
            <button className="btn btn-accent mr-4" onClick={kembaliHandler}>
              Batal
            </button>
            <button
              className="btn-primary btn"
              onClick={actionHandler}
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
