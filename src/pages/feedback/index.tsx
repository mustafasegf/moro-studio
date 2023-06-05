import { FormEvent, useEffect, useState } from "react";
import { Navbar } from "~/component/navbar";
import { api } from "~/utils/api";
import Link from "next/link";
import { useAuth } from "~/utils/session";
import cn from "classnames";
import { AddFeedbackSchema, addFeedbackSchema } from "~/utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import makeToast from "~/component/toast";
import router from "next/router";

export default function Feedback() {
  const [namaPenulis, setNamaPenulis] = useState("");
  const [isiFeedback, setIsiFeedback] = useState("");
  const addFeedback = api.feedback.addFeedback.useMutation();
  const { session } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddFeedbackSchema>({
    resolver: zodResolver(addFeedbackSchema),
    defaultValues: {
      namaPenulis: session?.nama,
    },
  });

  function onSubmit(val: AddFeedbackSchema) {
    addFeedback.mutate(val);
  }

  useEffect(
    function () {
      if (addFeedback.isSuccess) {
        makeToast("Feedback berhasil ditambah");
        const timeout = setTimeout(() => {
          void router.push("/feedback/list");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [addFeedback.isSuccess]
  );

  useEffect(
    function () {
      if (addFeedback.isError) {
        makeToast(`Error: ${addFeedback.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          addFeedback.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addFeedback.isError]
  );

  return (
    <>
      <h1 className="my-8 mb-4 text-center text-3xl font-bold">Buat Feedback</h1>
      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full">
          <div className="bg-grey bg-opacity-20 overflow-hidden shadow sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <p className="block text-sm font-medium leading-6">
                    Nama Penulis
                  </p>
                  <p className="mb-2 block w-full rounded-md border-0 py-1.5 pr-2.5 sm:text-sm sm:leading-6">
                    {" "}
                    {session?.nama}{" "}
                  </p>
                </div>
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
                    rows={5}
                    className={cn(
                      "mt-1 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 shadow-sm ring-1 ring-inset ring-grey focus:ring-1 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6",
                      { "input-error": errors.isiFeedback }
                    )}
                    placeholder="Isi Feedback"
                    {...register("isiFeedback")}
                  ></textarea>
                  {errors.isiFeedback && (
                    <p className="mt-2 text-sm text-red">{errors.isiFeedback.message}</p>
                  )}
                  <input hidden {...register("namaPenulis")}></input>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-light-grey text-right sm:px-6">
              <Link
                href="/feedback/list"
                type="button"
                className="h-10 inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-auto"
              >
                Kembali
              </Link>
              <button
                type="submit"
                className="h-10 mt-3 inline-flex w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-auto"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
