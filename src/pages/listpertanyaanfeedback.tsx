import Link from "next/link";
import { api } from "~/utils/api";

export default function ListFeedback() {
  const { data } = api.pertanyaanFeedback.getAllPertanyaanFeedback.useQuery();

  const deletePertanyaanFeedbackMutation = api.pertanyaanFeedback.deletePertanyaanFeedback.useMutation();

  function deleteFeedback(id: string) {
    const confirmed = window.confirm("Apa kamu yakin ingin menghapus pertanyaan feedback ini?");
    if (confirmed) {
      deletePertanyaanFeedbackMutation.mutate({ id: id }, {
        onSuccess: () => {
          window.alert("Pertanyaan Feedback berhasil dihapus!");
          window.location.reload();
        },
        onError: () => {    
          window.alert("Penghapusan pertanyaan feedback mengalami masalah");
        }
      });
    }
  }

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Pertanyaan Feedback</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/pertanyaanfeedback">
          <button className="mr-4 rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
            + Buat Pertanyaan Feedback
          </button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            <p className="mt-2 text-gray-600">{item.pertanyaan}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  className="text-sm text-gray-500 hover:text-red-600"
                  onClick={() => deleteFeedback(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
