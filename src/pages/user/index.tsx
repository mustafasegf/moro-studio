import { User } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { ModalAction } from "~/component/modal";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { LoadingPage } from "~/component/loading";
import { useRouter } from "next/router";
import { z } from "zod";

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

export default function ListUser() {
  const router = useRouter();
  const { page: pageQuery, limit: limitQuery } = router.query;
  const schema = z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(1)
  );

  const parsedPageQuery = schema.safeParse(pageQuery);
  const initialPage = parsedPageQuery.success ? parsedPageQuery.data : 1;
  const [page, setPage] = useState(initialPage);

  const parsedLimitQuery = schema.safeParse(limitQuery);
  const limit = parsedLimitQuery.success ? parsedLimitQuery.data : 100;
  const { data, isLoading } = api.user.getAllUser.useQuery({ page, limit });

  const { users, hasNextPage, maxPage } = data || {};

  function fetchNextPage() {
    setPage((prev) => prev + 1);
    router.replace({
      query: { page: page + 1, limit },
    });
  }

  function fetchPrevPage() {
    setPage((prev) => prev - 1);
    router.replace({
      query: { page: page - 1, limit },
    });
  }

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const utils = api.useContext();

  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess() {
      void utils.user.getAllUser.invalidate();
    },
  });

  function openModal(user: User) {
    setUser(user);
    setOpen(true);
  }

  function deleteHandler() {
    if (user) {
      deleteUser.mutate(user);
    }

    setOpen(false);
  }

  return (
    <>
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
          <Link href="/user/add" className="btn my-4">
            Add Account +
          </Link>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <table className="table-zebra table w-full">
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
                      <th>{i + 1 + (page - 1) * limit}</th>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.hp}</td>
                      <td>{item?.instagram ?? ""}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          onClick={() => openModal(item)}
                          className="btn-error btn"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="my-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => fetchPrevPage()}
                  className="btn-sm btn"
                  disabled={page <= 1}
                >
                  &lt;
                </button>
                halaman {page} dari {maxPage}
                <button
                  onClick={() => fetchNextPage()}
                  className="btn-sm btn"
                  disabled={!hasNextPage}
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
