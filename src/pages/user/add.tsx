import { User } from "@prisma/client";
import Link from "next/link";
import router from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function AddUser() {
  const [user, setUser] = useState<
    Omit<User, "id" | "createdAt" | "updatedAt" | "instagram">
  >({
    nama: "",
    email: "",
    role: "user",
    hp: "",
  });
  const addUser = api.user.addUser.useMutation()
  const { data:session, isLoading } = api.auth.getSession.useQuery();

  useEffect(function(){
    if (addUser.isSuccess) {
      setInterval(() => {
        void router.push("/user")
      }, 1000)
    }
  }, [addUser.isSuccess])

  useEffect(function(){
    if (addUser.isError) {
      setInterval(() => {
        addUser.reset()
      }, 5000)
    }
  }, [addUser.isError])

  function handleSubmit(e: FormEvent) { 
    e.preventDefault()
    addUser.mutate(user)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/login')
  }

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
        <div className="flex justify-center">
          <form className="bg-base-200 p-8 rounded-3xl max-w-lg grow" onSubmit={handleSubmit}>
            <div>
              <div className="">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium leading-6"
                >
                  Nama
                </label>
                <input
                  required
                  value={user.nama}
                  type="text"
                  id="nama"
                  className="input w-full max-w-md mt-1 mb-4 input-bordered"
                  onChange={(e) => setUser({ ...user, nama: e.target.value })}
                />
              </div>

              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email
                </label>
                <input
                  value={user.email}
                  required
                  type="text"
                  id="email"
                  className="input w-full max-w-md mt-1 mb-4 input-bordered"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div className="">
                <label
                  htmlFor="hp"
                  className="block text-sm font-medium leading-6"
                >
                  Hp
                </label>
                <input
                  value={user.hp}
                  type="text"
                  id="hp"
                  className="input w-full max-w-md mt-1 mb-4 input-bordered"
                  onChange={(e) => setUser({ ...user, hp: e.target.value })}
                />
              </div>

              <div className="">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6"
                >
                  Role
                </label>
                <select
                  value={user.role}
                  required
                  id="role"
                  className="input w-full max-w-xs mt-1 mb-4 input-bordered"
                  // @ts-ignore
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  {["admin", "studioManager", "blogManager", "user"].map(
                    (role) => (
                      <option>{role}</option>
                    )
                  )}
                </select>
              </div>
              <div>
                <input className="btn mt-4" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
