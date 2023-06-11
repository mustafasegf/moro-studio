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
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import makeToast from "~/component/toast";
import Link from "next/link";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssg = createSSG();
  const session = getServerAuthSession(ctx);
  const { id } = ctx.query;
  if (!id) {
    return { redirect: { destination: "/blog" } };
  }

  if (typeof id !== "string") {
    return { redirect: { destination: "/pesan" } };
  }

  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  if (session.role !== "blogManager" && session.role !== "admin") {
    return { redirect: { destination: "/" } };
  }

  const data = await ssg.blog.getBlogById.fetch({ id });
  if (!data) {
    return { redirect: { destination: "/blog" } };
  }

  return {
    props: {
      id,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function CreateDraft({ id }: { id: string }) {
  const { data: blog } = api.blog.getBlogById.useQuery({ id });
  const [judul, setJudul] = useState(blog?.judul || "");
  const [value, setValue] = useState(blog?.isi || "");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [imgId, setImgId] = useState<string>(blog?.gambarBlogId || "");

  const upload = api.blog.createPresignedUrl.useMutation();
  const deleteImage = api.blog.deleteImage.useMutation();
  const updateBlog = api.blog.updateBlog.useMutation();

  const { data: image, refetch } = api.blog.getImage.useQuery({ id: imgId });
  const router = useRouter();

  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({ id });
    refetch();
  }

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const [err, dataS3] = await tryToCatch(upload.mutateAsync);
    if (err) {
      console.log("cant get presigned url");
      console.error(err);
      return;
    }

    const { url, fields, imageId } = dataS3;
    // const {url, fields, imageId} = await upload.mutateAsync();
    const data = {
      ...fields,
      "Content-Type": file.type,
      file,
    };

    const formData = new FormData();
    for (const name in data) {
      // @ts-ignore
      formData.append(name, data[name]);
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Uploaded successfully!");
      setImgId(imageId);
      refetch();
    } else {
      console.error("Upload failed.");
      const reqData = await response.text();
      console.log(reqData);
      await deleteImage.mutateAsync({ id: imageId });
    }
    refetch();
  }

  useEffect(
    function () {
      if (updateBlog.isSuccess) {
        makeToast("blog berhasil ditambah");
        const timeout = setTimeout(() => {
          void router.push("/blog/draft");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [updateBlog.isSuccess]
  );

  useEffect(
    function () {
      if (updateBlog.isError) {
        makeToast(`Eror: ${updateBlog.error.message}`, { type: "error" });
        const timeout = setTimeout(() => {
          updateBlog.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [updateBlog.isError]
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    updateBlog.mutate({ ...blog!, isi: value, judul, gambarBlogId: imgId, id });
  }

  return (
    <>
      <CenterContainer>
        <Link href="/blog/draft">
          <button className="rounded-3xl mb-4 bg-light-grey text-black px-6 py-2 hover:bg-medium-grey hover:text-white-grey">
            Kembali Ke Draft Blog
          </button>
        </Link>

        <h3 className="mx-4 mb-8 text-center text-3xl font-bold">
          Ubah Draft Blog
        </h3>

        <form className="form-control gap-4" onSubmit={onSubmit}>
          <label htmlFor="thumbnail" className="text-sm font-medium leading-6">
            Pilih Thumbnail
          </label>
          <div className=" flex justify-center rounded-lg">
            <input
              type="file"
              id="thumbnail"
              className="file-input-bordered file-input-info file-input"
              disabled={!!image}
              onChange={uploadPhoto}
            />
          </div>

          {image && (
            <div key={image.id}>
              <img width={400} src={image.url} />
              <button
                className="mt-3 rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
                onClick={() => handleDelete(image.id)}
              >
                Delete
              </button>
            </div>
          )}

          <label htmlFor="judul" className="text-sm font-medium leading-6">
            Judul Blog
          </label>
          <input
            type="text"
            id="judul"
            placeholder="Judul Blog"
            className="input-bordered input rounded-lg"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />

          <ReactMde
            toolbarCommands={[
              ["header", "bold", "italic", "strikethrough"],
              ["link", "quote", "code"],
              ["unordered-list", "ordered-list", "checked-list"],
            ]}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            childProps={{
              writeButton: {
                tabIndex: -1,
              },
              // textArea: {
              //   rows: 50,
              //   cols: 50,
              // },
            }}
          />

          <input
            className="mb-6 mt-3 rounded-3xl border bg-blue px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-[#6380BB]"
            type="submit"
            value="Simpan"
          />
        </form>
      </CenterContainer>
    </>
  );
}
