import { getServerAuthSession, useAuth } from "~/utils/session";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next/types";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { CenterContainer } from "~/component/centercontainer";
import { useForm } from "react-hook-form";
import { tryToCatch } from "~/utils/trycatch";
import { useRouter } from "next/router";

import ReactMde from "react-mde";
import MarkdownView from "react-showdown";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import makeToast from "~/component/toast";

import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";
import { format } from "date-fns";
import { AddCommentSchema, addCommentSchema } from "~/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import cn from "classnames";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  const { id } = ctx.query;
  if (!id) {
    return { redirect: { destination: "/blog" } };
  }

  if (typeof id !== "string") {
    return { redirect: { destination: "/pesan" } };
  }

  const data = await ssg.blog.getBlogById.fetch({ id });
  if (!data) {
    return { redirect: { destination: "/blog" } };
  }

  await Promise.all([
    ssg.blog.getImage.prefetch({ id: data.gambarBlogId }),
    ssg.blog.getAllComment.prefetch({ id }),
  ]);

  return {
    props: {
      id,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function BlogView({ id }: { id: string }) {
  const { session } = useAuth();

  const { data: blog } = api.blog.getBlogById.useQuery({ id });
  const { data: image } = api.blog.getImage.useQuery({
    id: blog?.gambarBlogId!,
  });

  const { data: comments } = api.blog.getAllComment.useQuery({ id });
  const utils = api.useContext();

  const addComment = api.blog.addComment.useMutation({
    onSuccess() {
      utils.blog.getAllComment.invalidate({ id });
    },
  });

  const addLikeBlog = api.blog.addBlogLike.useMutation({
    onSuccess() {
      utils.blog.getBlogById.invalidate({ id });
    },
  });

  const addDislikeBlog = api.blog.addBlogDislike.useMutation({
    onSuccess() {
      utils.blog.getBlogById.invalidate({ id });
    },
  });

  const removeLikeBlog = api.blog.removeBlogLike.useMutation({
    onSuccess() {
      utils.blog.getBlogById.invalidate({ id });
    },
  });

  const removeDislikeBlog = api.blog.removeBlogDislike.useMutation({
    onSuccess() {
      utils.blog.getBlogById.invalidate({ id });
    },
  });

  const addLike = api.blog.addLike.useMutation({
    onSuccess() {
      utils.blog.getAllComment.invalidate({ id });
    },
  });

  const addDislike = api.blog.addDislike.useMutation({
    onSuccess() {
      utils.blog.getAllComment.invalidate({ id });
    },
  });

  const removeLike = api.blog.removeLike.useMutation({
    onSuccess() {
      utils.blog.getAllComment.invalidate({ id });
    },
  });

  const removeDislike = api.blog.removeDislike.useMutation({
    onSuccess() {
      utils.blog.getAllComment.invalidate({ id });
    },
  });

  function handleDislike(id: string) {
    if (
      !comments
        ?.flatMap((comments) => comments.dislikedBy)
        .some((user) => user.id === session?.id)
    ) {
      addDislike.mutate({ id });
    } else {
      removeDislike.mutate({ id });
    }
  }

  function handleLike(id: string) {
    if (
      !comments
        ?.flatMap((comments) => comments.likedBy)
        .some((user) => user.id === session?.id)
    ) {
      addLike.mutate({ id });
    } else {
      removeLike.mutate({ id });
    }
  }

  function handleBlogDislike(id: string) {
    if (!blog?.dislikedBy?.some((user) => user.id === session?.id)) {
      addDislikeBlog.mutate({ id });
    } else {
      removeDislikeBlog.mutate({ id });
    }
  }

  function handleBlogLike(id: string) {
    if (!blog?.likedBy?.some((user) => user.id === session?.id)) {
      addLikeBlog.mutate({ id });
    } else {
      removeLikeBlog.mutate({ id });
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      id,
    },
  });

  function onSubmit(val: AddCommentSchema) {
    addComment.mutate(val);
  }

  useEffect(
    function () {
      if (addComment.isSuccess) {
        makeToast("komentar berhasil ditambah");
        const timeout = setTimeout(() => {
          addComment.reset();
        }, 1500);
        return () => clearTimeout(timeout);
      }
    },
    [addComment.isSuccess]
  );

  useEffect(
    function () {
      if (addComment.isError) {
        makeToast(`Eror: ${addComment.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          addComment.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addComment.isError]
  );

  useEffect(
    function () {
      if (addLike.isError) {
        makeToast(`Eror: ${addLike.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          addLike.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addLike.isError]
  );

  useEffect(
    function () {
      if (addDislike.isError) {
        makeToast(`Eror: ${addDislike.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          addDislike.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [addDislike.isError]
  );

  return (
    <>
      <CenterContainer>
        <h1 className="mx-4 text-center text-2xl font-bold">{blog?.judul}</h1>
        <img src={image?.url} className="mx-auto my-4" />

        <MarkdownView
          markdown={blog?.isi!}
          options={{
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
          }}
        />

        <div className="mt-8">
          <div className="flex items-center justify-center gap-2">
            <span>{blog?.likedBy.length}</span>
            <RiThumbUpLine onClick={() => handleBlogLike(blog!.id)} />
            <span>{blog?.dislikedBy.length}</span>
            <RiThumbDownLine onClick={() => handleBlogDislike(blog!.id)} />
          </div>
        </div>

        {session && (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-2"
            >
              <h3 className="my-5 font-bold text-black">
                Berikan Komentar Anda
              </h3>

              <textarea
                rows={10}
                placeholder="Masukkan komentar anda"
                className="bg-white input-bordered input h-[inherit] w-screen max-w-2xl p-4"
                {...register("isi")}
              />
              {errors.isi && (
                <span className={cn("mb-4", { "text-error": errors.isi })}>
                  {errors.isi.message}
                </span>
              )}

              <input type="hidden" {...register("id")} />
              <input
                type="submit"
                value="Kirim komentar"
                className="btn-sm btn-md btn"
              />
            </form>
          </div>
        )}

        {!session && (
          <div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="my-5 font-bold text-black">
                Login Dahulu Untuk Memberikan Komentar
              </h3>
            </div>
          </div>
        )}

        <div className="my-8">
          <h3 className="mx-5 mt-5 font-bold text-black">
            Komentar pengguna lain
          </h3>

          <div>
            {comments?.map((comment) => (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-base">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-black-900 dark:text-white text-b mr-3 inline-flex items-center font-semibold">
                      {comment.user.nama}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      <time dateTime="2021-02-8" title="February 8th, 2022">
                        {format(comment.createdAt, "dd MMM yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.isi}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  {/* Like */}
                  <button
                    type="button"
                    className="text-gray-500 dark:text-gray-400 flex items-center text-sm hover:underline"
                  >
                    <RiThumbUpLine onClick={() => handleLike(comment.id)} />
                    {comment.likedBy.length}
                  </button>

                  {/* Dislike */}
                  <button
                    type="button"
                    className="text-gray-500 dark:text-gray-400 flex items-center text-sm hover:underline"
                  >
                    <RiThumbDownLine
                      onClick={() => handleDislike(comment.id)}
                    />
                    {comment.dislikedBy.length}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CenterContainer>
    </>
  );
}
