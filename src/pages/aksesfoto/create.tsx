import Link from "next/link"
import { api } from "~/utils/api"
import { tryToCatch } from "~/utils/trycatch"

export default function Upload() {
  
  const upload = api.image.createPresignedUrl.useMutation()
  const deleteImage = api.image.deleteImage.useMutation()
  const {data: images, refetch} = api.image.getAllImages.useQuery()

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    const file = e.target.files?.[0]
    if (!file) return

    const [err, dataS3] = await tryToCatch(upload.mutateAsync)
    if (err) {
      console.log("cant get presigned url")
      console.error(err)
      return
    }

    const {url, fields, imageId} = dataS3
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
      await deleteImage.mutateAsync({id: imageId})
    }
    refetch()
    
  }
  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({id})
    refetch()
  }

  return (
    <>

      <h1 className="my-8 mb-4 text-center text-3xl font-bold">
        Tambah Foto
      </h1>

      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-grey bg-opacity-20  overflow-hidden shadow sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="paket-foto"
                    className="block text-base font-medium leading-6 mb-2"
                  >
                    Masukkan Foto
                  </label>
                  <input
                    onChange={uploadPhoto}
                    type="file"
                    className="file-input file-input-info
                    w-full max-w-xs"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-light-grey px-4 py-3 text-right sm:px-6">
              <Link
                href="/aksesfoto"
                type="button"
                className="h-10 mt-3 inline-flex w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white-grey hover:bg-[#6380BB] sm:mt-0 sm:w-auto"
              >
                Simpan
              </Link>
            </div>
          </div>
      </div>
    </>
  );
}
