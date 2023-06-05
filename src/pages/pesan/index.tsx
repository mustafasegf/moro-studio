import { api } from "~/utils/api";

import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag, IoMdPeople } from "react-icons/io";
import { LoadingPage } from "~/component/loading";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { CenterContainer } from "~/component/centercontainer";
import { createSSG } from "~/server/SSGHelper";

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  await ssg.catalogue.getAllCatalogue.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
export default function Book() {
  const { data, isError, error } = api.catalogue.getAllCatalogue.useQuery();

  return (
    <>
      <CenterContainer>
        <div className="flex flex-wrap justify-center">
          {isError ? (
            <p> {error.message} </p>
          ) : (
            data?.map((item) => (
              <Link
                  key={item.id}
                  href={`/pesan/jadwal?katalog=${item.id}`}
                  className="mx-4 my-6 mb-4 w-full rounded-xl border border-base-300 p-6 shadow-xl transition duration-150 ease-in-out hover:-translate-y-1 hover:border-base-content md:mr-4 lg:w-[calc(50%-2rem)]"
                >
                <div>
                  <h3 className="text-left text-lg font-bold">{item.nama}</h3>
                  <div className="mt-4 rounded-md bg-light-grey bg-opacity-60 p-4">
                    <p className="whitespace-pre-line">{item.deskripsi}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-center">
                        <BiTimeFive className="mr-2 text-2xl text-gray-600" />
                        <span> 
                          {item.durasi > 60 && Math.floor(item.durasi/60) + " Jam" } 
                          {item.durasi % 60 + " Menit" } 
                        </span>
                      </div>
                      <div className="flex items-center">
                        <IoIosPricetag className="mr-2 text-2xl text-gray-600" />
                        <span>
                          {item.harga.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      {item.jumlahOrang &&
                        <div className="flex items-center">
                        <IoMdPeople className="mr-2 text-2xl text-gray-600" />
                          <span>{item.jumlahOrang} orang</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </CenterContainer>
    </>
  );
}
