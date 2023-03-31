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
    function() {
      if (addUser.isSuccess) {
        const timeout = setTimeout(async () => {
          void router.push("/user");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [addUser.isSuccess]
  );

  useEffect(
    function() {
      if (addUser.isError) {
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
      {addUser.isError && (
        <div className="toast">
          <div className="alert alert-error">
            <div>
              <span>Error: {addUser.error.message}</span>
            </div>
          </div>
        </div>
      )}

      {addUser.isSuccess && (
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>user tertambah</span>
            </div>
          </div>
        </div>
      )}

      <div className="m-8">
        <Link href="/user" className="btn">
          kemabli
        </Link>
        <div className="flex justify-center">
          <form
            className="max-w-lg grow rounded-3xl bg-base-200 p-8"
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
                  required
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
                  required
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
                  required
                  id="role"
                  className="input-bordered input mt-1 mb-4 w-full max-w-xs"
                  {...register("role")}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              <input className="btn mt-4" type="submit" value="kirim" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
