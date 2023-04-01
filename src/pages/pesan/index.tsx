import { api } from "~/utils/api";

import { BiTimeFive } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";
import { LoadingPage } from "~/component/loading";
import Link from "next/link";
import { CenterContainer } from "~/component/centercontainer";

export default function Book() {
  const { data, isLoading, error } = api.catalogue.getAllCatalogue.useQuery();

  return (
    <>
      <CenterContainer>
        <div className="flex flex-wrap justify-center">
          {isLoading ? (
            <LoadingPage />
          ) : (
            data?.map((item) => (
              <Link
                  key={item.id}
                  href={`/pesan/jadwal?katalog=${item.id}`}
                  className="mx-4 my-6 mb-4 w-full rounded-xl border border-base-300 p-6 shadow-xl transition duration-150 ease-in-out hover:-translate-y-1 hover:border-base-content md:mr-4 lg:w-[calc(50%-2rem)]"
                >
                <div>
                  <h3 className="text-left text-lg font-bold">{item.nama}</h3>
                  <div className="mt-4 rounded-md bg-base-300 p-4">
                    <pre>{item.deskripsi}</pre>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-row gap-4">
                      <div className="flex items-center">
                        <BiTimeFive className="mr-2 text-2xl text-gray-600" />
                        <span>{item.durasi}</span>
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
