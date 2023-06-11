import { Role, User } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { ModalAction } from "~/component/modal";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/utils/session";
import { LoadingPage } from "~/component/loading";
import { useRouter } from "next/router";
import { z } from "zod";
import { roles } from "~/utils/roles";
import { useDebounce } from "usehooks-ts";

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
  const [filteredRole, setFilteredRole] = useState<Role | undefined>(undefined);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 350);
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

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

  const { data, isLoading } = api.user.getAllUser.useQuery({
    page,
    limit,
    role: filteredRole,
    search: debounceSearch,
  });
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

  function handleChangeRole(e: React.ChangeEvent<HTMLSelectElement>) {
    const role = e.target.value as Role | "all";

    if (role === "all") {
      setFilteredRole(undefined);
    } else {
      setFilteredRole(role);
    }
  }

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
        content="Apakah Anda yakin akan menghapus user ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={deleteHandler}
      />

      <div className="min-h-screen">
        <h1 className="my-8 mb-4 text-center text-3xl font-bold">
          Daftar Pengguna
        </h1>

        <div className="m-8">
          <div className="flex flex-col items-end justify-end gap-4 md:flex-row md:items-center">
            <div className="flex w-full flex-row items-center justify-end gap-2">
              <label htmlFor="search" className="text-lg">
                cari
              </label>
              <input
                type="text"
                id="search"
                className="input-bordered input w-full max-w-[15rem] "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="input-bordered input w-full max-w-[15rem]"
              onChange={handleChangeRole}
            >
              {["all", ...roles].map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <Link
                href="/user/tambah"
                className="w-40 rounded-3xl bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]"
              >
                Add Account +
              </Link>
            </div>
          </div>
          <div className="relative z-0 m-5 overflow-x-auto">
            {isLoading ? (
              <LoadingPage />
            ) : (
              <>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <td className="bg-light-grey bg-opacity-80 text-base normal-case"></td>
                      <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                        Nama
                      </th>
                      <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                        Email
                      </th>
                      <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                        No Hp
                      </th>
                      <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                        Instagram
                      </th>
                      <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                        Role
                      </th>
                      <th className="bg-light-grey bg-opacity-80 text-base normal-case">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((item, i) => (
                      <tr key={item.id}>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          {i + 1 + (page - 1) * limit}
                        </td>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          {item.nama}
                        </td>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          {item.email}
                        </td>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          {item.hp}
                        </td>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          {item?.instagram ?? ""}
                        </td>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          {item.role}
                        </td>
                        <td
                          className={
                            i % 2 === 0
                              ? "bg-white-grey bg-opacity-50"
                              : "bg-light-grey bg-opacity-40"
                          }
                        >
                          <button
                            onClick={() => openModal(item)}
                            className="rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
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
      </div>
    </>
  );
}
