import Link from "next/link"
import router from "next/router"
import { api } from "~/utils/api"
import { tryToCatch } from "~/utils/trycatch"
import { ParsedUrlQuery } from "querystring";

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function Upload(props: { id: string }) {

  const upload = api.aksesFoto.createPresignedUrl.useMutation()
  const deleteImage = api.aksesFoto.deleteFoto.useMutation()
  const { data: images, refetch } = api.aksesFoto.getAllFoto.useQuery()
  const { id } = props;

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    const file = e.target.files?.[0]
    if (!file) return

    console.log(id)
    const [err, dataS3] = await tryToCatch(() => upload.mutateAsync({ bookingId: id }));
    if (err) {
      console.log("cant get presigned url")
      console.error(err)
      return
    }

    const { url, fields, imageId } = dataS3
    // const {url, fields, imageId} = await upload.mutateAsync();
    const data = {
      ...fields,
      'Content-Type': file.type,
      file,
    }

    const formData = new FormData()
    for (const name in data) {
      // @ts-ignore
      formData.append(name, data[name]);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Uploaded successfully!')
    }
    else {
      console.error('Upload failed.')
      const reqData = await response.text()
      console.log(reqData)
      await deleteImage.mutateAsync({ id: imageId })
    }
    refetch()

  }


  return (
    <>

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Tambah Foto
      </h1>

      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="paket-foto"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Masukkan Foto
                </label>
                <input
                  onChange={uploadPhoto}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-300 px-4 py-3 text-right sm:px-6">
            <Link
              href="/aksesfoto/list"
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-700 hover:text-gray-200 sm:mr-3 sm:w-auto"
            >
              Simpan
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
