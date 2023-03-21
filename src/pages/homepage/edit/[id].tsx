import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function CreateSection(this: any) {
  const [images, setImages] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [texts, setTexts] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");

  let index = 0;

  const [order, setOrder] = useState(0);

  const [arr, setArr] = useState<
    {
      image: string;
      title: string;
      text: string;
      link: string;
    }[]
  >([]);

  const updateSection = api.homepage.updateSection.useMutation();
  const router = useRouter();
  const { id } = router.query as Query;

  useEffect(() => {
    if (updateSection.isSuccess) {
      router.push("/homepage/edit");
    }
  }, [updateSection.isSuccess]);

  const { data, error, isLoading } = api.homepage.getSectionById.useQuery({
    id,
  });

  useEffect(() => {
    if (data) {
      setImages(data.image);
      setTitles(data.title);
      setTexts(data.text);
      setLinks(data.link);
      setType(data.type);
      setOrder(data.order);

      setImage(images[0] as string);
      setTitle(titles[0] as string);
      setText(texts[0] as string);
      setLink(links[0] as string);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    arr.forEach((e) => {
      images.push(e.image);
      titles.push(e.title);
      texts.push(e.text);
      links.push(e.link);
    });

    if (type == "hero") {
      setImages([image]);
    }

    if (type != "CTA") {
      setTitles([]);
      setTexts([]);
      setLinks([]);
    }

    updateSection.mutate({
      id: id,
      image: images,
      title: titles,
      text: texts,
      link: links,
      order: order,
    });
  };

  function returnString(s: string) {
    return s;
  }

  function handleAddPart() {
    if (image == "") {
      return;
    }

    images.push(returnString(image));
    setImage("");

    if (type == "carousel" && image == "") {
      return;
    } else if (
      type == "CTA" &&
      image == "" &&
      title == "" &&
      text == "" &&
      link == ""
    ) {
      return;
    }

    arr.push({
      image: image,
      title: title,
      text: text,
      link: link,
    });

    index++;
    setImage(images[index] as string);
    setTitle(titles[index] as string);
    setText(texts[index] as string);
    setLink(links[index] as string);
  }

  return (
    <>
      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Update Section
      </h1>

      {
        <form onSubmit={handleUpdate}>
          <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-gray-200 shadow sm:rounded-md">
              <div className="m-1 border-2 border-gray-300">
                <div className=" grid grid-cols-5 ">
                  <div className="col-span-2 m-1 grid place-content-center ">
                    <img className="p-4" src={image} alt="Preview" />
                  </div>
                  <div className="col-span-3  bg-gray-200 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          URL Gambar
                        </label>
                        <input
                          value={image}
                          type="text"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => {
                            setImage(e.target.value);
                          }}
                        />
                      </div>
                      {type == "CTA" && (
                        <>
                          <div className="col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Judul
                            </label>
                            <input
                              value={title}
                              type="text"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Deskripsi
                            </label>
                            <textarea
                              value={text}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => {
                                setText(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Link
                            </label>
                            <input
                              value={link}
                              type="text"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 pr-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => {
                                setLink(e.target.value);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {type != "hero" && (
                  <>
                    <div className="grid grid-cols-2 px-4 py-3">
                      <button
                        className={
                          index <= 0
                            ? "disable "
                            : "" +
                              "inline-flex w-full justify-center rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-gray-200 sm:mr-3 sm:w-auto"
                        }
                      >
                        Sebelumnya
                      </button>
                      <div
                        onClick={handleAddPart}
                        className={
                          index >= images.length - 1
                            ? "disable "
                            : "" +
                              "mt-3 inline-flex w-full justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white hover:bg-gray-700 sm:mt-0 sm:w-auto"
                        }
                      >
                        Selanjutnya
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="bg-gray-300 px-4 py-3 text-right sm:px-6">
                <input
                  type="number"
                  value={order}
                  onChange={(e) => {
                    setOrder(Number(e.target.value));
                  }}
                />
                <Link
                  href="/homepage/edit"
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-gray-200 sm:mr-3 sm:w-auto"
                >
                  Kembali
                </Link>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white hover:bg-gray-700 sm:mt-0 sm:w-auto"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
}
