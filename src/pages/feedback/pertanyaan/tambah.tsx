import { FormEvent, useEffect, useState } from "react";
import { Navbar } from "~/component/navbar";
import { api } from "~/utils/api";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addPertanyaanFeedbackSchema,
  AddPertanyaanFeedbackSchema,
} from "~/utils/schemas";
import router from "next/router";
import cn from "classnames";
import makeToast from "~/component/toast";

export default function Feedback() {
  const addPertanyaanFeedback =
    api.pertanyaanFeedback.addPertanyaanFeedback.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddPertanyaanFeedbackSchema>({
    resolver: zodResolver(addPertanyaanFeedbackSchema),
  });

  function onSubmit(val: AddPertanyaanFeedbackSchema) {
    addPertanyaanFeedback.mutate(val);
  }

  useEffect(
    function () {
      if (addPertanyaanFeedback.isSuccess) {
        makeToast("Pertanyaan berhasil ditambah");
        const timeout = setTimeout(() => {
          void router.push("/feedback/pertanyaan");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [addPertanyaanFeedback.isSuccess]
  );

  useEffect(
    function () {
      if (addPertanyaanFeedback.isError) {
        makeToast(`Error: ${addPertanyaanFeedback.error.message}`, {
          type: "error",
        });
        const timeout = setTimeout(() => {
          addPertanyaanFeedback.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addPertanyaanFeedback.isError]
  );

  return (
    <>
      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Buat Pertanyaan Feedback
      </h1>
      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="overflow-hidden bg-grey bg-opacity-20 shadow sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="deskripsi"
                    className="block text-sm font-medium leading-6"
                  >
                    Pertanyaan
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="deskripsi"
                      rows={5}
                      className={cn(
                        "mt-1 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 shadow-sm ring-1 ring-inset ring-grey focus:ring-1 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6",
                        { "input-error": errors.pertanyaan }
                      )}
                      placeholder="Buat pertanyaan"
                      {...register("pertanyaan")}
                    />
                    {errors.pertanyaan && (
                      <span
                        className={cn("mb-4", {
                          "text-error": errors.pertanyaan,
                        })}
                      >
                        {errors.pertanyaan.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-light-grey px-4 py-3 text-right sm:px-6">
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
