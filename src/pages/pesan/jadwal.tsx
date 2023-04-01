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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  const { katalog } = ctx.query;

  if (typeof katalog !== "string") {
    return { redirect: { destination: "/pesan" } };
  }
  await ssg.catalogue.getCatalogueById.prefetch({ id: katalog });

  return {
    props: {
      katalog,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function Jadwal({ katalog }: { katalog: string }) {
  const { data } = api.catalogue.getCatalogueById.useQuery({ id: katalog });
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

  // dates.forEach(d => console.log(format(d, "PPpp")))

  return (
    <>
      <CenterContainer>
        <div className=" flex flex-row justify-between">
          {dates.map((date, i) => (
            <DatesRow now={now} date={date} interval={interval} />
          ))}
        </div>
      </CenterContainer>
    </>
  );
}

interface DatesRowProps {
  now: Date;
  date: Date;
  interval: number;
}

function DatesRow({ now, date, interval }: DatesRowProps) {
  const today = getDay(now) == getDay(date);


  const rowClass = cn(
    "mt-4 mb-8 rounded-xl py-3 px-4 text-center text-lg  ",
    {
      "relative bg-base-300 rounded-lg": today,
    }
  );

  return (
    <div key={date.toISOString()} className={rowClass}>
      {today && <p className="absolute inline-block -top-3 left-8 py-0.5 px-1 rounded-2xl text-sm bg-[#595959] text-neutral-50">Today</p>}
      <p className="text-center text-lg font-bold">
        {format(date, "eeee", { locale: id })}
      </p>
      <p className="text-center text-2xl font-bold">{format(date, "ee")}</p>
      {[...Array(interval)].map((_, i) => (
        <DatesButton now={now} date={addMinutes(date, i * 40)} />
      ))}
    </div>
  );
}

interface DatesButtonProps {
  now: Date;
  date: Date;
}

function DatesButton({ now, date: content }: DatesButtonProps) {
  const enabled = isAfter(content, now);
  const buttonClass = cn(
    "mt-3 rounded-xl bg-base-100 border-2 py-3 px-2 text-center text-lg",
    {
      "border-neutral-400 transition duration-75 ease-in-out hover:-translate-y-[2px] hover:bg-neutral-300":
        enabled,
      "border-neutral-200 text-neutral-500 opacity-70": !enabled,
    }
  );

  return (
    <div className={buttonClass}>
      {format(content, "hh:mm aa", {
        locale: enUS,
      })}
    </div>
  );
}
