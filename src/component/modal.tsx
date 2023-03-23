import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import cn from "classnames";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose(): void;
};

export function Modal({ children, open, onClose }: ModalProps) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    onClose();
  });

  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  return (
    <div className={modalClass}>
      <div className="modal-box" ref={ref}>
        {children}
      </div>
    </div>
  );
}

interface ModalActionProps {
  open: boolean;
  isDelete?: boolean;
  title: string;
  content: string;
  onClose: () => void;
  kembaliHandler: () => void;
  actionHandler: () => void;
}

export function ModalAction({
  open,
  isDelete,
  title,
  content,
  onClose,
  kembaliHandler,
  actionHandler,
}: ModalActionProps) {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="z-50 overflow-y-auto">
          <div className="flex items-center py-3 px-4">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>

          <p className="py-4 px-4">{content}</p>
          <div className="flex justify-end py-3 px-4">
            <button className="btn mr-4" onClick={kembaliHandler}>
              Batal
            </button>
            <button
              className={isDelete ? "btn-error btn" : "btn-primary btn"}
              onClick={actionHandler}
            >
              {isDelete ? "Hapus" : "Simpan"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
