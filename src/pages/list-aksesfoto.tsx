import Link from "next/link";
import { api } from "~/utils/api";

export default function ListFeedback() {
  const {data: images, refetch} = api.image.getAllImages.useQuery()

  const deleteImage = api.image.deleteImage.useMutation();

  function deleteImages(id: string) {
    const confirmed = window.confirm("Apa kamu yakin ingin menghapus foto ini?");
    if (confirmed) {
      deleteImage.mutate({ id: id }, {
        onSuccess: () => {
          window.alert("Foto berhasil dihapus!");
          window.location.reload();
        },
        onError: () => {    
          window.alert("Penghapusan foto mengalami masalah");
        }
      });
    }
  }

  async function handleDelete(id: string) {
    await deleteImage.mutateAsync({id})
    refetch()
  }

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Foto</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/create-aksesfoto">
          <button className="mr-4 rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
            + Tambah Foto
          </button>
        </Link>
      </div>

        <div className="flex flex-col w-full border-opacity-50">
            <h1 className="my-8 text-3xl font-bold">13/04/2023</h1>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
            {images && (
              images.map(image => (
              <div key={image.id}>
                <img width={400} src={image.url} />
                <button className="btn btn-error" onClick={() => handleDelete(image.id) }>Delete</button>
                <button className="btn btn-primary">Download</button>
              </div>
              )) 
            )}
            </div>
        <div className="divider"></div>
        <h1 className="my-8 text-3xl font-bold">15/04/2023</h1>
        </div>
    </>
  );
}
