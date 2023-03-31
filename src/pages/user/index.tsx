import { User } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { Modal, ModalAction } from "~/component/modal"
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { LoadingPage, LoadingSpiner } from "~/component/loading";

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
  const { data, isLoading } = api.user.getAllUser.useQuery();
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
      <ModalAction
        isDelete
        open={open}
        title="Delete User"
        content="Apakah Anda yakin akan mengdelete user ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={deleteHandler}
      />

    <div className="m-8">
      <div className="flex flex-row-reverse">
        <Link href="/user/add" className="my-4 btn">Add Account +</Link>
      </div>
      <div className="overflow-x-auto">
        {isLoading 
          ? <LoadingPage />
          : <TableUser users={data} openModal={openModal} />
        }
      </div>
    </div>
  </>
}

interface UserTableProps {
  users?: User[]
  openModal: (user: User) => void
}

function TableUser({users, openModal}: UserTableProps) {
  return <>
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
            {users?.map((item, i) => (
              <tr key={item.id}>
                <th>{i+1}</th>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.hp}</td>
                <td>{item?.instagram ?? ""}</td>
                <td>{item.role}</td>
                <td> 
                  <button onClick={() => openModal(item)} className="btn btn-error">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  </>
}
