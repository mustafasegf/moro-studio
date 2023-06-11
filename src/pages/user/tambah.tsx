import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import router from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { getServerAuthSession } from "~/utils/session";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roles } from "~/utils/roles";
import cn from "classnames";
import { addUserSchema, AddUserSchema } from "~/utils/schemas";
import makeToast from "~/component/toast";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }
  return { props: {} };
}

export default function AddUser() {
  const addUser = api.user.addUser.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
  });

  function onSubmit(val: AddUserSchema) {
    addUser.mutate(val);
  }

  useEffect(
    function () {
      if (addUser.isSuccess) {
        makeToast("user berhasil ditambah");
        const timeout = setTimeout(() => {
          void router.push("/");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [addUser.isSuccess]
  );

  useEffect(
    function () {
      if (addUser.isError) {
        makeToast(`Eror: ${addUser.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          addUser.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addUser.isError]
  );

  return (
    <>
      <h1 className="my-8 mb-4 text-center text-3xl font-bold">Buat Akun</h1>
      <div className="m-8">
        {/* <Link
          href="/user"
          className="my-3 inline-flex w-full justify-center rounded-3xl bg-light-grey py-2 px-3 text-sm font-semibold text-black hover:bg-medium-grey hover:text-white-grey sm:mt-0 sm:w-28"
        >
          Kembali
        </Link> */}
        <div className="flex justify-center">
          <form
            className="max-w-lg grow rounded-3xl bg-grey bg-opacity-20 p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-4">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium leading-6"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  className={cn(
                    "input-bordered input mt-1 mb-2 w-full max-w-md",
                    { "input-error": errors.nama }
                  )}
                  {...register("nama")}
                />
                {errors.nama && (
                  <span className={cn("mb-4", { "text-error": errors.nama })}>
                    {errors.nama.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className={cn(
                    "input-bordered input mt-1 mb-2 w-full max-w-md",
                    { "input-error": errors.email }
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <span className={cn("mb-4", { "text-error": errors.email })}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hp"
                  className="block text-sm font-medium leading-6"
                >
                  Hp
                </label>
                <input
                  type="text"
                  id="hp"
                  className={cn(
                    "input-bordered input mt-1 mb-2 w-full max-w-md",
                    { "input-error": errors.hp }
                  )}
                  {...register("hp")}
                />
                {errors.hp && (
                  <span className={cn("mb-4", { "text-error": errors.hp })}>
                    {errors.hp.message}
                  </span>
                )}
              </div>

              <div className="">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="input-bordered input mt-1 mb-4 w-full max-w-md"
                  {...register("role")}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              <input
                className="mt-4 inline-flex h-10 w-full justify-center rounded-3xl bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-28"
                type="submit"
                value="Kirim"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
