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
      <p>Upload a .png or .jpg image (max 10MB).</p>
      <input
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
      {images && (
       images.map(image => (
        <div key={image.id}>
          <img width={400} src={image.url} />
          <button className="btn btn-error" onClick={() => handleDelete(image.id) }>Delete</button>
        </div>
       )) 
      )}
    </>
  )
}