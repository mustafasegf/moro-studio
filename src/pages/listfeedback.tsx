import Link from "next/link";
import { api } from "~/utils/api";

export default function ListFeedback() {
  const { data, error, isLoading } = api.feedback.getAllFeedback.useQuery();

  const deleteFeedbackMutation = api.feedback.deleteFeedback.useMutation();

  function deleteFeedback(id: string) {
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

  return <>
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
                <Link className="btn btn-ghost btn-xs" href="/">Details</Link>
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