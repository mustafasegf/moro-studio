import { GetServerSidePropsContext } from "next/types";
import { CenterContainer } from "~/component/centercontainer";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { format, addDays, eachDayOfInterval, set, addMinutes } from 'date-fns'
import { id, enUS } from "date-fns/locale";

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
  const startHour = 10
  const endHour = 21
  const duration = 40
  const interval = Math.ceil((endHour - startHour) * 60 / duration)

  const now = new Date()
  const start = set(new Date(), { hours: startHour, minutes: 0, seconds: 0, milliseconds: 0 })
  const end = addDays(start, 6)
  const dates = eachDayOfInterval({
    start,
    end
  })

  return (
    <>
      <CenterContainer>
        <div className=" flex flex-row justify-between">
          {dates.map(date => (
            <div key={date.toISOString()}>
              <div className="text-center text-lg font-bold">{format(date, 'eeee', {locale: id})}</div>
              <div className="text-center text-2xl font-bold">{format(date, 'ee')}</div>
              {[...Array(interval)].map((_, i) => (
                <div key={i} className="flex flex-row justify-between">
                  <div className="py-3 px-2 mt-3 border-2 border-neutral-400 rounded-xl transition duration-75 ease-in-out hover:-translate-y-[2px] hover:bg-neutral-300 text-center text-lg">{format(addMinutes(start, i * 40), 'hh:mm aa', {locale: enUS})}</div>
                </div>
              ))}

            </div>
          ))}
        </div>
      </CenterContainer>
    </>
  );
}
