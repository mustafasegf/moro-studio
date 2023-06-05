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
  const ssg = createSSG();
  const data = await ssg.blog.getAllBlogPosted.fetch();

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
  const { data: blogs } = api.blog.getAllBlogPosted.useQuery();
  const ids = blogs?.map((blog) => blog.gambarBlogId)!;
  const { data: images } = api.blog.getImagesById.useQuery({ ids });

  const [id, setId] = useState<string>("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [isKonfirmasi, setIsKonfirmasi] = useState(false);

  const hapusBlog = api.blog.deleteBlog.useMutation({
    onSuccess() {
      utils.blog.getAllBlogPosted.invalidate();
    },
  });

  const draftBlog = api.blog.draftBlog.useMutation({
    onSuccess() {
      utils.blog.getAllBlogPosted.invalidate();
    },
  });

  const utils = api.useContext();

  function deleteHandler() {
    hapusBlog.mutate({ id });
    setIsDeleting(false);
  }

  function konfirmasiHandler() {
    draftBlog.mutate({ id });
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
        title="Draft Blog"
        content="Apakah Anda yakin akan mengdraft blog ini?"
        onClose={() => setIsKonfirmasi(false)}
        kembaliHandler={() => setIsKonfirmasi(false)}
        actionHandler={konfirmasiHandler}
      />

      <div className="min-h-screen">
        <div className="mx-auto px-4 mx-2 sm:mx-16">
          <h1 className="my-8 text-center text-3xl font-bold">Blog</h1>

          <div className="mb-4 flex justify-end">
            {(session?.role === "admin" || session?.role === "blogManager") && (
              <Link href="/blog/tambah">
                <button className="mr-5 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]">
                  + Buat Blog Baru
                </button>
              </Link>
            )}
          </div>

          <div className="mb-5 grid grid-cols-1 gap-8">
            {blogs?.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="rounded-lg border-dark-grey bg-white-grey shadow-lg hover:border">
                  <div className="flex h-full flex-col p-4 lg:flex-row lg:items-stretch">
                    <img
                      className="mb-4 mr-2 h-48 w-auto object-cover lg:mb-0"
                      src={
                        images?.find((image) => image.id === blog.gambarBlogId)
                          ?.url
                      }
                      alt={blog.judul}
                    />
                    <div className="flex flex-grow flex-col">
                      <h3 className="mb-3 text-lg font-semibold">
                        {blog.judul}
                      </h3>
                      <p className="text-sm">
                        {blog.isi.substring(0, 500)}...
                      </p>
                      {session?.role === "admin" && (
                        <div className="mt-4">
                          <button
                            className="mr-2 rounded-3xl border bg-blue px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-[#6380BB]"
                            /*@ts-ignore*/
                            onClick={(e) => onKonfirmasi(e, blog.id)}
                          >
                            Draft
                          </button>
                          <button
                            className="rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
                            /*@ts-ignore*/
                            onClick={(e) => onDelete(e, blog.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                      {session?.role === "blogManager" && (
                        <button
                          className="rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
                          /*@ts-ignore*/
                          onClick={(e) => onDelete(e, blog.id)}
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
