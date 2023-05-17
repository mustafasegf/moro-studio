import Link from "next/link";
import { useEffect, useState } from "react";
import { ModalAction } from "~/component/modal";
import makeToast from "~/component/toast";
import { api } from "~/utils/api";
import { useAuth } from "~/utils/session";

export default function ListFeedback() {
  const [open, setOpen] = useState(false);
  const [idQuestion, setIdQuestion] = useState("");
  const { session } = useAuth();
  const { data } = api.pertanyaanFeedback.getAllPertanyaanFeedback.useQuery();

  const utils = api.useContext();
  const deletePertanyaanFeedbackMutation = api.pertanyaanFeedback.deletePertanyaanFeedback.useMutation({
    onSuccess() {
      void utils.pertanyaanFeedback.getAllPertanyaanFeedback.invalidate();
    },
  });

  function deleteHandler() {
    if (idQuestion) {
      deletePertanyaanFeedbackMutation.mutate({id: idQuestion});
    }

    setOpen(false);
  }

  function openModal(id: string) {
    setIdQuestion(id);
    setOpen(true);
  }

  useEffect(
    function() {
      if (deletePertanyaanFeedbackMutation.isSuccess) {
        makeToast("pertanyaan berhasil dihapus", {duration: 5000})
        const timeout = setTimeout(() => {
          deletePertanyaanFeedbackMutation.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deletePertanyaanFeedbackMutation.isSuccess]
  );

  useEffect(
    function() {
      if (deletePertanyaanFeedbackMutation.isError) {
        makeToast(`Error: ${deletePertanyaanFeedbackMutation.error.message}`, {type: "error"})
        const timeout = setTimeout(() => {
          deletePertanyaanFeedbackMutation.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deletePertanyaanFeedbackMutation.isError]
  );

  // function deleteFeedback(id: string) {
  //   const confirmed = window.confirm("Apa kamu yakin ingin menghapus pertanyaan feedback ini?");
  //   if (confirmed) {
  //     deletePertanyaanFeedbackMutation.mutate({ id: id }, {
  //       onSuccess: () => {
  //         window.alert("Pertanyaan Feedback berhasil dihapus!");
  //         window.location.reload();
  //       },
  //       onError: () => {    
  //         window.alert("Penghapusan pertanyaan feedback mengalami masalah");
  //       }
  //     });
  //   }
  // }

  return (
    <>
      <ModalAction
        isDelete
        open={open}
        title="Delete Pertanyaan"
        content="Apakah Anda yakin akan mengdelete pertanyaan ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={deleteHandler}
      />
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Pertanyaan Feedback</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/feedback/pertanyaan/tambah">
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
                  onClick={() => openModal(item.id)}>
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
