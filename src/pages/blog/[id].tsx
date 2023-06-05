import { getServerAuthSession } from "~/utils/session";
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

  await ssg.blog.getImage.prefetch({ id: data.gambarBlogId });

  return {
    props: {
      id,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function CreateDraft({ id }: { id: string }) {
  const { data: blog } = api.blog.getBlogById.useQuery({ id });
  const { data: image } = api.blog.getImage.useQuery({
    id: blog?.gambarBlogId!,
  });

  const router = useRouter();

  return (
    <>
      <div className="min-h-screen">
        <CenterContainer>
          <h3 className="mx-4 text-center text-2xl font-bold">{blog?.judul}</h3>
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
        </CenterContainer>
      </div>
    </>
  );
}
