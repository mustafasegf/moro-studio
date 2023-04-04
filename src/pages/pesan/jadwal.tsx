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
} from "date-fns";
import { id, enUS } from "date-fns/locale";
import cn from "classnames";
import Link from "next/link";
import { atom, useAtom } from "jotai";

const katalogAtom = atom("");

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

  return {
    props: {
      katalog,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function Jadwal({ katalog }: { katalog: string }) {
  const [_, setKatalog] = useAtom(katalogAtom);
  setKatalog(katalog);

  const { data } = api.catalogue.getCatalogueById.useQuery({ id: katalog });
  if (!data) {
    return;
  }

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
  const end = addDays(start, 6);

  const dates = eachDayOfInterval({
    start,
    end,
  }).map((d) => setHours(d, startHour));

  return (
    <>
      <CenterContainer>
        <p>{data?.durasi / 40}</p>
        <div className=" flex flex-row justify-between">
          {dates.map((date, rowIdx) => (
            <div
              key={date.toISOString()}
              className={cn(
                "mt-4 mb-8 rounded-xl py-3 px-4 text-center text-lg  ",
                {
                  "relative rounded-lg bg-base-300":
                    getDay(now) == getDay(date),
                }
              )}
            >
              {getDay(now) == getDay(date) && (
                <p className="absolute -top-3 left-8 inline-block rounded-2xl bg-[#595959] py-0.5 px-1 text-sm text-neutral-50">
                  Today
                </p>
              )}
              <p className="text-center text-lg font-bold">
                {format(date, "eeee", { locale: id })}
              </p>
              <p className="text-center text-2xl font-bold">
                {format(date, "ee")}
              </p>
              {[...Array(interval)].map((_, colIdx) => (
                <DatesButton
                  key={colIdx}
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
  now: Date;
  date: Date;
}

function DatesButton({ now, date }: DatesButtonProps) {
  const [katalog] = useAtom(katalogAtom);

  const enabled = isAfter(date, now);
  const buttonClass = cn(
    "mt-3 rounded-xl bg-base-100 border-2 py-3 px-2 text-center text-lg",
    {
      "border-neutral-400 transition duration-75 ease-in-out hover:-translate-y-[2px] hover:bg-neutral-300":
        enabled,
      "border-neutral-200 text-neutral-500 opacity-70": !enabled,
    }
  );

  function handleEnter() { }
  function handleLeave() { }
  const Child = () => (
    <div
      className={buttonClass}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
    >
      {format(date, "hh:mm aa", {
        locale: enUS,
      })}
    </div>
  );
  const dateStr = format(date, "yyyy-MM-dd'T'HH:mm:ss");

  if (enabled)
    return (
      <Link href={`/pesan/konfirmasi?katalog=${katalog}&date=${dateStr}`}>
        <Child />
      </Link>
    );

  return <Child />;
}
