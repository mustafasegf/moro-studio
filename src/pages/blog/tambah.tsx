import { getServerAuthSession } from "~/utils/session";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next/types";
import { createSSG } from "~/server/SSGHelper";
import { api } from "~/utils/api";
import { CenterContainer } from "~/component/centercontainer";
import { useForm } from "react-hook-form";
import { tryToCatch } from "~/utils/trycatch"
import { useRouter } from "next/router";

import ReactMde from "react-mde";
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
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "blogManager" && session.role !== "admin") {

    return { redirect: { destination: "/" } };
  }
  const ssg = createSSG();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
//
export default function CreateDraft() {
  const [value, setValue] = useState("");
  const [judul, setJudul] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [id, setId] = useState<string>("");

  const upload = api.blog.createPresignedUrl.useMutation();
  const deleteImage = api.blog.deleteImage.useMutation();
  const createBlog = api.blog.createBlog.useMutation();

  const { data: image, refetch } = api.blog.getImage.useQuery({ id });
  const router = useRouter();

  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({id})
    refetch()
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
      setId(imageId);
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
    function() {
      if (createBlog.isSuccess) {
        makeToast("blog berhasil ditambah")
        const timeout = setTimeout(() => {
          void router.push("/blog");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    [createBlog.isSuccess]
  );

  useEffect(
    function() {
      if (createBlog.isError) {
        makeToast(`Eror: ${createBlog.error.message}`, {type: "error"})
        const timeout = setTimeout(() => {
          createBlog.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [createBlog.isError]
  );

  function onSubmit(e: FormEvent ) {
    e.preventDefault();
    createBlog.mutate({judul, isi: value, imageId: id})
  }

  return (
    <>
      <CenterContainer>
        <h3 className="mx-4 text-center text-2xl font-bold">
          Buat Draft Blog Baru
        </h3>

        <form className="form-control gap-4" onSubmit={onSubmit}>

          <label
            htmlFor="thumbnail" 
            className="text-sm font-medium leading-6"
          >
            Pilih Thumbnail
          </label>
          <div className=" flex justify-center rounded-lg">
            <input
              type="file"
              id="thumbnail"
              className="file-input-bordered file-input"
              disabled={!!image}
              onChange={uploadPhoto}
            />
          </div>

          {image && (
            <div key={image.id}>
               <img width={400} src={image.url} />
               <button className="btn btn-error" onClick={() => handleDelete(image.id) }>Delete</button>
             </div>
          )}


          <label htmlFor="judul" className="text-sm font-medium leading-6">
            Judul Blog
          </label>
          <input
            type="text"
            id="judul"
            placeholder="Judul Blog"
            className="bg-white input-bordered input rounded-lg"
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

          <input className="btn mt-4" type="submit" value="Simpan" />
        </form>
      </CenterContainer>
    </>
  );
}
