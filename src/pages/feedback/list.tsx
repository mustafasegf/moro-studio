import Link from "next/link";
import { api } from "~/utils/api";

export default function ListFeedback() {
  const { data } = api.feedback.getAllFeedback.useQuery();

  const deleteFeedbackMutation = api.feedback.deleteFeedback.useMutation();

  function deleteFeedback(id: string) {
    const confirmed = window.confirm("Apa kamu yakin ingin menghapus feedback ini?");
    if (confirmed) {
      deleteFeedbackMutation.mutate({ id }, {
        onSuccess: () => {
          window.alert("Feedback berhasil dihapus!");
          window.location.reload();
        },
        onError: () => {    
          window.alert("Penghapusan feedback mengalami masalah");
        }
      });
    }
  }

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Feedback</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/feedback">
          <button className="mr-4 rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
            + Buat Feedback
          </button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item) => (
          <div key={item.Id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">{item.namaPenulis}</h3>
            <p className="mt-2 text-gray-600">{item.isiFeedback}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">{item.updatedAt.toDateString()}</div>
              <div className="flex items-center">
                <Link className="mr-4 text-sm text-gray-500 hover:text-gray-700" href={`/feedback/${item.Id}`}>Update</Link>
                <button
                  className="text-sm text-gray-500 hover:text-red-600"
                  onClick={() => deleteFeedback(item.Id)}>
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
