import { User } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { Modal } from "~/component/modal"
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx)
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }
  return {props: {}}
}

export default function ListUser() {
  const { data } = api.user.getAllUser.useQuery();

  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false);
  const utils = api.useContext();

  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess() {
      void utils.user.getAllUser.invalidate()
    }
  })

  function openModal(user: User) {
    setUser(user)
    setOpen(true)
  }

  function deleteHandler() {
    if (user) {
      deleteUser.mutate(user)
    }

    setOpen(false)
  }

  return <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="z-50 overflow-y-auto">
          <div className="flex items-center py-3 px-4">
              <h3 className="text-lg font-medium">Delete User</h3>
          </div>

          <p className="py-4 px-4">
            Apakah Anda yakin akan mengdelete user ini?
          </p>
          <div className="flex justify-end py-3 px-4">
            <button
              className="btn mr-4"
              onClick={() => setOpen(false)}
            >
              Batal
            </button>
            <button
              className="btn btn-error"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

    <div className="m-8">
      <div className="flex flex-row-reverse">
        <Link href="/user/add" className="my-4 btn">
          Add Account +
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Email</th>
              <th>No hp</th>
              <th>instagram</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr>
                <th>{i+1}</th>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.hp}</td>
                <td>{item?.instagram ?? ""}</td>
                <td>{item.role}</td>
                <td> 
                  <button onClick={() => openModal(item)} className="btn btn-error">Delele</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}
