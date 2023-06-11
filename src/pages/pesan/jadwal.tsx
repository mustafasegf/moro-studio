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
  setMinutes,
  setHours,
  getDay,
  differenceInMinutes,
  differenceInDays,
  getMinutes,
  getHours,
} from "date-fns";
import { id, enUS } from "date-fns/locale";
import cn from "classnames";
import Link from "next/link";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Katalog } from "@prisma/client";

const katalogAtom = atom<Katalog | undefined>(undefined);
const hoverIndexAtom = atom(-1);
const bookedAtom = atom<Set<number>>(new Set<number>());

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  const { katalog } = ctx.query;

  if (typeof katalog !== "string") {
    return { redirect: { destination: "/pesan" } };
  }
  const data = await ssg.catalogue.getCatalogueById.fetch({ id: katalog });
  if (!data) {
    return { redirect: { destination: "/pesan" } };
  }

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
      katalogId: katalog,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function Jadwal({ katalogId }: { katalogId: string }) {
  const startHour = 10;
  const endHour = 21;
  const duration = 40;
  const interval = Math.ceil(((endHour - startHour) * 60) / duration);

  const now = new Date();
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
  const [katalog, setKatalog] = useAtom(katalogAtom);
  const [booked, setBooked] = useAtom(bookedAtom); 

  const { data } = api.catalogue.getCatalogueById.useQuery({ id: katalogId });
  if (!data) {
    return;
  }

  useEffect(() => {
    setKatalog(data);
  }, [katalog]);

  const { data: listBooking } = api.booking.getAllBooking.useQuery({
    from: start,
    to: end,
  });

  useEffect(() => {
    listBooking?.forEach(booking => {

      const row = differenceInDays(booking.jadwal, start);
      const col =
        (getHours(booking.jadwal) * 60 +
          getMinutes(booking.jadwal) -
          startHour * 60) /
        40;

      for (let i = 0; i < booking.katalog.durasi / 40; i++) {
        const idx = row * interval + col + i
        booked.add(idx);
      }
    });

    setBooked(booked);
  }, [booked])

  return (
    <>
      <CenterContainer>
        <div className=" flex flex-row justify-between overflow-x-auto">
          {dates.map((date, rowIdx) => (
            <div
              key={date.toISOString()}
              className={cn(
                "mt-4 mb-8 rounded-xl py-3 px-4 text-center text-lg  ",
                {
                  "relative rounded-lg bg-light-grey bg-opacity-40":
                    getDay(now) == getDay(date),
                }
              )}
            >
              {getDay(now) == getDay(date) && (
                <p className="absolute -top-3 left-7 md:left-10 inline-block rounded-2xl bg-[#595959] py-0.5 px-1 text-sm text-neutral-50">
                  Today
                </p>
              )}
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
                  now={now}
                  date={addMinutes(date, colIdx * 40)}
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
  now: Date;
  date: Date;
}

function DatesButton({ now, date, idx }: DatesButtonProps) {
  const [katalog] = useAtom(katalogAtom);
  const [hoverIndex, setHoverIndex] = useAtom(hoverIndexAtom);
  const [booked] = useAtom(bookedAtom); 
  const interval = 17;

  const enabled = isAfter(date, now) && !booked.has(idx);

  const range = (katalog?.durasi ?? 40) / 40;
  let clickable = interval - (idx % interval) >= range;
  let hover = idx - hoverIndex < range && idx - hoverIndex >= 0 && hoverIndex != -1;

  for (let i = 0; i < range; i++) {
    if (booked.has(hoverIndex + i)) {
      clickable = false;
      hover = false;
      break;
    }
  }


  function handleEnter() {
    setHoverIndex(enabled ? idx : -1);
  }
  function handleLeave() {
    setHoverIndex(-1);
  }

  const Child = () => (
    <div
      className={cn(
        "mt-3 rounded-xl border-2 border-neutral-400 bg-base-100 py-3 px-2 text-center text-lg",
        { "border-neutral-200 text-neutral-500 opacity-70 bg-base-300": !enabled },
        {
          "-translate-y-[2px] bg-light-grey transition duration-75 ease-in-out":
            hover && (idx != hoverIndex || clickable),
        }
      )}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
    >
      {format(date, "hh:mm aa", {
        locale: enUS,
      })}
    </div>
  );
  const dateStr = format(date, "yyyy-MM-dd'T'HH:mm:ss");

  if (enabled && clickable)
    return (
      <Link href={`/pesan/form?katalog=${katalog?.id}&date=${dateStr}`}>
        <Child />
      </Link>
    );

  return <Child />;
}
