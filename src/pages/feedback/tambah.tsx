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
    }
  });

  function onSubmit(val: AddFeedbackSchema) {
    addFeedback.mutate(val);
  }

  useEffect(
    function () {
      if (addFeedback.isSuccess) {
        makeToast("Feedback berhasil ditambah")
        const timeout = setTimeout(() => {
          void router.push("/feedback");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [addFeedback.isSuccess]
  );

  useEffect(
    function () {
      if (addFeedback.isError) {
        makeToast(`Error: ${addFeedback.error.message}`, { type: "error" })
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
      <h1 className="my-8 text-center text-3xl font-bold">Buat Feedback</h1>
      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <label htmlFor="namaPenulis" className="block text-sm font-medium leading-6 text-gray-900">Nama Penulis*</label>
                  <input defaultValue={session?.nama} type="text" name="namaPenulis" id="namaPenulis" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" disabled />
                </div>
              </div>

              <div className="col-span-6">
                <label htmlFor="deskripsi" className="block text-sm font-medium leading-6 text-gray-900">Deskripsi Feedback*</label>
                <div className="mt-2">
                  <textarea
                    id="deskripsi"
                    rows={5}
                    className={cn(
                      "mt-1 block w-[28rem] rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                      { "input-error": errors.isiFeedback }
                    )}
                    placeholder="Isi Feedback"
                    {...register("isiFeedback")}>
                  </textarea>
                  {errors.isiFeedback && (
                    <span className={cn("mb-4", { "text-error": errors.isiFeedback })}>
                      {errors.isiFeedback.message}
                    </span>
                  )}
                  <input hidden {...register("namaPenulis")}></input>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <Link href="/feedback" type="button" className="inline-flex w-full justify-center rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey sm:mr-3 sm:w-auto">Kembali</Link>
                <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-grey py-2 px-3 text-sm font-semibold text-white-grey hover:bg-medium-grey sm:mt-0 sm:w-auto">Simpan</button>
              </div>
            </div>
          </div>
        </form>
      </div >
    </>
  );
}
