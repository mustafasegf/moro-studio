import Link from "next/link";
import { api } from "~/utils/api";

export default function ListFeedback() {
  const { data, error, isLoading } = api.feedback.getAllFeedback.useQuery();

  const deleteFeedbackMutation = api.feedback.deleteFeedback.useMutation();

  function deleteFeedback(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this feedback?");
    if (confirmed) {
      deleteFeedbackMutation.mutate({ Id: id }, {
        onSuccess: () => {
          window.alert("Feedback deleted successfully.");
          window.location.reload();
        },
        onError: () => {    
          window.alert("Error deleting feedback.");
        }
      });
    }
  }

  return <>
    <h1 className="my-8 text-center text-3xl font-bold">Daftar Feedback</h1>

    <div className="mb-4 flex justify-end">
      <Link href="/feedback">
        <button className="mr-4 rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-700">
          + Buat Feedback
        </button>
      </Link>
    </div>

    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
              <th>Nama</th>
              <th>Isi Feedback</th>
              <th>Last Update On</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, no) => (
            <tr key={item.Id}>
              <td>{no + 1}</td>
              <td>{item.namaPenulis}</td>
              <td>{item.isiFeedback}</td>
              <td>{item.updatedAt.toDateString()}</td>
              <td>
                <Link className="btn btn-ghost btn-xs" href={`/updatefeedback/${item.Id}`}>Update</Link>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => deleteFeedback(item.Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
            </table>
      </div>
  </>
}