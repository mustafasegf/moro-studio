import { MdDelete } from "react-icons/md";

type DialogProps = {
  title: string;
  content: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export function Dialog({ title, content, id, isOpen, onClose, onDelete}: DialogProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10">
          <div className="flex min-h-screen items-center justify-center bg-neutral-600 bg-opacity-10 px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>

            <div
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mb-4 flex items-center">
                    <MdDelete className="text-2xl text-gray-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        {content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={onDelete}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
