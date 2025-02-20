import { useState } from "react";
import { api } from "~/utils/api";
import { tryToCatch } from "~/utils/trycatch";
import { Modal } from "~/component/modal";
import { getServerAuthSession } from "~/utils/session";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== "studioManager") {
    return { redirect: { destination: "/" } };
  }

  return { props: {} };
}

export default function Homepage() {
  const upload = api.image.createPresignedUrl.useMutation();
  const deleteImage = api.image.deleteImage.useMutation();
  const { data: images, refetch } = api.image.getAllImages.useQuery();
  const homepage = api.homepage.getHomepage.useQuery();
  const updateHomepage = api.homepage.updateHomepage.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const handleOpenModal2 = () => setIsModalOpen2(true);
  const handleCloseModal2 = () => setIsModalOpen2(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => setIsChecked(!isChecked);
  const [img, setImg] = useState<string>("");
  const [imgs, setImgs] = useState<string[]>([]);

  function handleUpdateHero() {
    if (homepage.data?.id == null) {
      return;
    }

    updateHomepage.mutate({
      id: homepage.data?.id,
      image: img,
      carousel: homepage.data?.carousel,
    });
  }

  function handleUpdateCarousel() {
    if (homepage.data?.id == null) {
      return;
    }

    updateHomepage.mutate({
      id: homepage.data?.id,
      image: homepage.data?.image,
      carousel: imgs,
    });
  }

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(false);
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
    } else {
      console.error("Upload failed.");
      const reqData = await response.text();
      console.log(reqData);
      await deleteImage.mutateAsync({ id: imageId });
    }
    refetch();
  }

  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({ id });
    refetch();
  }

  function Xbutton() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-x"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#000000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleUpdateHero}>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center py-3">
              <h3 className="text-lg font-medium">Update Gambar Utama</h3>
              <button
                type="submit"
                className="ml-4 inline-flex justify-center rounded-md border-blue bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]  sm:ml-auto sm:mt-0 sm:w-auto"
              >
                Simpan
              </button>
              <button className="ml-auto" onClick={() => setIsModalOpen(false)}>
                {Xbutton()}
              </button>
            </div>
            <div className="carousel-center carousel rounded-box mb-8 space-x-4 bg-light-grey p-4">
              {img && (
                <div className="carousel-item">
                  <img src={img} style={{ height: "36px" }} alt="Main Image" />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              {images &&
                images.map((image) => (
                  <div
                    key={image.id}
                    className="flex flex-col justify-center gap-2"
                    onClick={() => {
                      setImg(image.url);
                    }}
                  >
                    <img
                      className="max-h-32 object-contain"
                      src={image.url}
                      alt="Gallery Image"
                    />
                  </div>
                ))}
            </div>
          </div>
        </form>
      </Modal>

      <Modal open={isModalOpen2} onClose={handleCloseModal2}>
        <form onSubmit={handleUpdateCarousel}>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center py-3">
              <h3 className="text-lg font-medium">Update Gambar Carousel</h3>
              <button
                type="submit"
                className="ml-4 inline-flex justify-center rounded-md border-blue bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]  sm:ml-auto sm:mt-0 sm:w-auto"
              >
                Simpan
              </button>
              <button
                onClick={() => setImgs([])}
                className="ml-4 inline-flex justify-center rounded-md border-blue bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]  sm:mt-0 sm:w-auto"
              >
                Reset
              </button>
              <button
                className="ml-auto"
                onClick={() => setIsModalOpen2(false)}
              >
                {Xbutton()}
              </button>
            </div>
            <div className="carousel-center carousel rounded-box mb-8 space-x-4 bg-light-grey p-4">
              {imgs.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <img
                    src={item}
                    style={{ height: "36px" }}
                    alt={`Carousel Item ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              {images &&
                images.map((image) => (
                  <div
                    key={image.id}
                    className="flex flex-col justify-center gap-2"
                    onClick={() =>
                      setImgs((prevImgs) => [...prevImgs, image.url])
                    }
                  >
                    <img
                      className="max-h-32 object-contain"
                      src={image.url}
                      alt="Gallery Image"
                    />
                  </div>
                ))}
            </div>
          </div>
        </form>
      </Modal>

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Update Gambar Homepage
      </h1>

      <div className="grid min-h-full grid-cols-1 items-center justify-center gap-4 py-8 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-2 lg:grid-cols-2 lg:px-8">
        <div className="flex justify-center">
          <button
            className="btn gap-2 rounded-md border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
            onClick={handleOpenModal}
          >
            Ubah gambar utama
          </button>
        </div>

        <div className="row-span-2 overflow-hidden shadow sm:rounded-md">
          <div className="bg-grey bg-opacity-20 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="paket-foto"
                  className="block text-sm font-medium leading-6"
                >
                  Masukkan Foto
                </label>
                <input
                  onChange={uploadPhoto}
                  type="file"
                  className="file-input-bordered file-input-info file-input mt-2 w-full max-w-xs"
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>
          </div>

          <div className="bg-light-grey px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="mt-3 inline-flex w-full justify-center rounded-md border-blue bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]  sm:mt-0 sm:w-auto"
            >
              Simpan
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="btn gap-2 rounded-md border-blue bg-blue text-white-grey hover:border-[#6380BB] hover:bg-[#6380BB]"
            onClick={handleOpenModal2}
          >
            Ubah gambar carousel
          </button>
        </div>
      </div>

      <div className="flex flex-col place-content-center">
        <h1 className="my-8 mb-4 text-center text-3xl font-bold">
          Daftar Gambar
        </h1>
        <h1 className="my-8 mb-4 text-center text-2xl font-bold">
          Tampilkan{" "}
          <span>
            <input
              type="checkbox"
              checked={isChecked}
              className="checkbox"
              onClick={handleCheck}
            />
          </span>
        </h1>

        {isChecked && (
          <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-4 sm:px-6 lg:px-8">
            {images &&
              images.map((image) => (
                <div
                  key={image.id}
                  className="flex flex-col justify-center gap-2"
                >
                  <img className="max-h-72 object-contain" src={image.url} />
                  <button
                    className="rounded-3xl border bg-[#FC182A] px-6 py-2 text-white-grey transition duration-300 ease-in-out hover:bg-red hover:text-white-grey"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
