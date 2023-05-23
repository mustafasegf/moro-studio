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
      deletePertanyaanFeedbackMutation.mutate({ id: idQuestion });
    }

    setOpen(false);
  }

  function openModal(id: string) {
    setIdQuestion(id);
    setOpen(true);
  }

  useEffect(
    function () {
      if (deletePertanyaanFeedbackMutation.isSuccess) {
        makeToast("pertanyaan berhasil dihapus", { duration: 5000 })
        const timeout = setTimeout(() => {
          deletePertanyaanFeedbackMutation.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deletePertanyaanFeedbackMutation.isSuccess]
  );

  useEffect(
    function () {
      if (deletePertanyaanFeedbackMutation.isError) {
        makeToast(`Error: ${deletePertanyaanFeedbackMutation.error.message}`, { type: "error" })
        const timeout = setTimeout(() => {
          deletePertanyaanFeedbackMutation.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deletePertanyaanFeedbackMutation.isError]
  );

  return (
    <>
      <ModalAction
        isDelete
        open={open}
        title="Delete Pertanyaan"
        content="Apakah Anda yakin akan menghapus pertanyaan ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={deleteHandler}
      />
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Pertanyaan Feedback</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/feedback/pertanyaan/tambah">
          <button className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]">
            + Buat Pertanyaan Feedback
          </button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item) => (
          <div key={item.id} className="mx-4 my-6 rounded-lg bg-[#e5e7eb] p-6 shadow-lg md:mx-10 lg:mx-20">
            <p className="text-left text-lg font-bold">{item.pertanyaan}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  className="focus:shadow-outline rounded bg-[#FC182A] py-2 px-4 font-bold text-white-grey hover:bg-red focus:outline-none"
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
