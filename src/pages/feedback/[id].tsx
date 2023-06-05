import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function UpdateFeedback() {
  const [namaPenulis, setNamaPenulis] = useState("");
  const [isiFeedback, setIsiFeedback] = useState("");

  const updateFeedback = api.feedback.updateFeedback.useMutation();
  const router = useRouter();
  const { id } = router.query as Query;

  useEffect(
    function () {
      if (updateFeedback.isSuccess) {
        void router.push("/feedback/list");
      }
    },
    [updateFeedback.isSuccess]
  );

  const { data, isLoading, error } = api.feedback.getFeedbackById.useQuery({
    id,
  });

  useEffect(() => {
    if (data) {
      setNamaPenulis(data.namaPenulis);
      setIsiFeedback(data.isiFeedback);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdateFeedback = (e: FormEvent) => {
    e.preventDefault();
    updateFeedback.mutate({ id, namaPenulis, isiFeedback });
  };

  return (
    <>
      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Update Feedback
      </h1>

      {
        <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleUpdateFeedback} className="w-full max-w-lg">
            <div className="overflow-hidden bg-grey bg-opacity-20 shadow sm:rounded-md">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="namaPenulis"
                      className="block text-sm font-medium leading-6"
                    >
                      Nama Penulis
                    </label>
                    <input
                      defaultValue={data?.namaPenulis}
                      type="text"
                      name="namaPenulis"
                      id="namaPenulis"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 shadow-sm ring-1 ring-inset ring-grey focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
                      disabled
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="deskripsi"
                      className="block text-sm font-medium leading-6"
                    >
                      Deskripsi Feedback
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="deskripsi"
                        name="deskripsi"
                        rows={5}
                        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 shadow-sm ring-1 ring-inset ring-grey focus:ring-1 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
                        value={isiFeedback}
                        onChange={(e) => setIsiFeedback(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-light-grey px-4 py-3 text-right sm:px-6">
                <Link
                  href="/feedback/list"
                  type="button"
                  className="inline-flex h-10 w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-auto"
                >
                  Kembali
                </Link>
                <button
                  type="submit"
                  className="mt-3 inline-flex h-10 w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-auto"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    </>
  );
}
