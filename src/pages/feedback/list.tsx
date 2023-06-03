import Link from "next/link";
import { useEffect, useState } from "react";
import { ModalAction } from "~/component/modal";
import makeToast from "~/component/toast";
import { api } from "~/utils/api";
import { useAuth } from "~/utils/session";

export default function ListFeedback() {
  const [open, setOpen] = useState(false);
  const [idFeedback, setIdFeedback] = useState("");
  const { session } = useAuth();
  const { data } = api.feedback.getAllFeedback.useQuery();

  const utils = api.useContext();
  const deleteFeedbackMutation = api.feedback.deleteFeedback.useMutation({
    onSuccess() {
      void utils.feedback.getAllFeedback.invalidate();
    },
  });

  function deleteHandler() {
    if (idFeedback) {
      deleteFeedbackMutation.mutate({ id: idFeedback });
    }

    setOpen(false);
  }

  function openModal(id: string) {
    setIdFeedback(id);
    setOpen(true);
  }

  useEffect(
    function () {
      if (deleteFeedbackMutation.isSuccess) {
        makeToast("Feedback berhasil dihapus", { duration: 5000 })
        const timeout = setTimeout(() => {
          deleteFeedbackMutation.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deleteFeedbackMutation.isSuccess]
  );

  useEffect(
    function () {
      if (deleteFeedbackMutation.isError) {
        makeToast(`Error: ${deleteFeedbackMutation.error.message}`, { type: "error" })
        const timeout = setTimeout(() => {
          deleteFeedbackMutation.reset();
        }, 5000);
        return () => clearTimeout(timeout);
      }
    },
    [deleteFeedbackMutation.isError]
  );

  return (
    <>
      <ModalAction
        isDelete
        open={open}
        title="Delete Feedback"
        content="Apakah Anda yakin akan menghapus feedback ini?"
        onClose={() => setOpen(false)}
        kembaliHandler={() => setOpen(false)}
        actionHandler={deleteHandler}
      />
      <h1 className="my-8 text-center text-3xl font-bold">Daftar Feedback</h1>

      <div className="mb-4 flex justify-end">
        <Link href="/feedback">
          {session?.role === 'admin' && (
            <button className="mr-4 rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]">
              + Buat Feedback
            </button>
          )}
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item) => (
          <div className={`mx-4 my-6 rounded-lg bg-[#e5e7eb] p-6 shadow-lg md:mx-10 lg:mx-20 flex flex-col justify-between border ${item.isiFeedback.length > 100 ? 'h-auto' : 'h-[20rem]'}`}>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.user.nama}</h3>
              <p className="mt-4 rounded-md bg-light-grey p-4 text-black break-words">{item.isiFeedback}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">{item.updatedAt.toDateString()}</div>
              <div className="flex items-center">
                {item.userId === session?.id && (
                  <Link className="mr-2 rounded-md border border-gray-600 px-6 py-2 text-gray-600 transition duration-300 ease-in-out hover:border-medium-grey hover:bg-medium-grey hover:text-white-grey" href={`/feedback/${item.id}`}>Ubah</Link>
                )}
                {session?.role === 'admin' && (
                  <button
                    className="focus:shadow-outline rounded bg-[#FC182A] py-2 px-4 font-bold text-white-grey hover:bg-red focus:outline-none"
                    onClick={() => openModal(item.id)}>
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
