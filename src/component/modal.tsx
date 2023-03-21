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
};
