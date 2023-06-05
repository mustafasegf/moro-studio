import { getServerAuthSession, useAuth } from "~/utils/session";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next/types";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { CenterContainer } from "~/component/centercontainer";
import { useForm } from "react-hook-form";
import { tryToCatch } from "~/utils/trycatch";
import { useRouter } from "next/router";
import Link from "next/link";
import { ModalAction } from "~/component/modal";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);

  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  if (session.role !== "blogManager" && session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }

  console.log("session", session);

  const ssg = createSSG();
  const data = await ssg.blog.getAllBlogDraft.fetch();

  if (!data) {
    return { redirect: { destination: "/blog" } };
  }

  const ids = data.map((blog) => blog.gambarBlogId);
  await ssg.blog.getImagesById.prefetch({ ids });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function DraftList() {
  const { session } = useAuth();
  const { data: blogs } = api.blog.getAllBlogDraft.useQuery();
  const ids = blogs?.map((blog) => blog.gambarBlogId)!;
  const { data: images } = api.blog.getImagesById.useQuery({ ids });

  const [id, setId] = useState<string>("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [isKonfirmasi, setIsKonfirmasi] = useState(false);

  const hapusBlog = api.blog.deleteBlog.useMutation({
    onSuccess() {
      utils.blog.getAllBlogDraft.invalidate();
    },
  });
  const konfirmasiBlog = api.blog.konfirmasiBlog.useMutation({
    onSuccess() {
      utils.blog.getAllBlogDraft.invalidate();
    },
  });

  const utils = api.useContext();

  function deleteHandler() {
    hapusBlog.mutate({ id });
    setIsDeleting(false);
  }

  function konfirmasiHandler() {
    konfirmasiBlog.mutate({ id });
    setIsKonfirmasi(false);
  }

  function onDelete(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    setId(id);
    setIsDeleting(true);
  }

  function onKonfirmasi(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    setId(id);
    setIsKonfirmasi(true);
  }

  return (
    <>
      <ModalAction
        isDelete
        open={isDeleting}
        title="Hapus Blog"
        content="Apakah Anda yakin akan menghapus blog ini?"
        onClose={() => setIsDeleting(false)}
        kembaliHandler={() => setIsDeleting(false)}
        actionHandler={deleteHandler}
      />

      <ModalAction
        open={isKonfirmasi}
        title="Publikasi Blog"
        content="Apakah Anda yakin akan mengpublikasi blog ini?"
        onClose={() => setIsKonfirmasi(false)}
        kembaliHandler={() => setIsKonfirmasi(false)}
        actionHandler={konfirmasiHandler}
      />
      <div className="min-h-screen">
        <div className="m-8">
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:items-center">
            <div className="w-full">
              {blogs?.map((blog) => (
                <Link key={blog.id} href={`/blog/draft/${blog.id}`}>
                  <div className="mb-4 w-full flex-col rounded-lg bg-white-grey p-4 shadow-md">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{blog.judul}</h3>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <img
                            className="max-h-48 md:w-1/3"
                            src={
                              images?.find(
                                (image) => image.id === blog.gambarBlogId
                              )?.url
                            }
                            alt="Blog Image"
                          />
                          <p className="text-sm md:w-2/3 md:pl-4">
                            {blog.isi.substring(0, 500)}...
                          </p>
                          <div className="mt-4 flex gap-2 sm:mt-0 md:ml-4 md:mb-0 md:w-auto">
                            {session?.role === "admin" && (
                              <button
                                className="rounded-3xl border bg-blue px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-[#6380BB]"
                                /*@ts-ignore*/
                                onClick={(e) => onKonfirmasi(e, blog.id)}
                              >
                                Konfirmasi
                              </button>
                            )}
                            <button
                              className="rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
                              /*@ts-ignore*/
                              onClick={(e) => onDelete(e, blog.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
