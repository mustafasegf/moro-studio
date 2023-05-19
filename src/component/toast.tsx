import { toast } from "react-hot-toast";
import cn from "classnames";

export type ToastOptions = {
  duration?: number;
  id?: string;
  position?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
  type?: "success" | "error" | "warning" | "info" | "blank";
};
export default function makeToast(message: string, props?: ToastOptions) {
  let { duration, id, position, type } = {
    duration: 1500,
    id: "default",
    position: "bottom-right" as const,
    type: "success",
    ...props,
  };
  if (type === "error") {
    duration = 5000;
  }

  toast.custom(
    (t) => (
      <div
        className={cn("toast transition duration-300", {
          "opacity-0": !t.visible,
          "opacity-100": t.visible,
        })}
      >
        <div
          className={cn("alert", {
            "alert-success": type === "success",
            "alert-error": type === "error",
            "alert-warning": type === "warning",
            "alert-info": type === "info",
          })}
        >
          <div>
            <span>{message}</span>
          </div>
        </div>
      </div>
    ),
    { duration: duration, id, position }
  );
}
