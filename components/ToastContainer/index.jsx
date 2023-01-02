import classes from "./style.module.scss";
import NewItemToast from "./NewItemToast";
import { offEvent, onEvent } from "@lib/event";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const TOAST_DURATION = 5000;

function ToastContainer() {
  const idRef = useRef(0);
  const [toasts, setToasts] = useState([]);

  const removeToastById = useCallback((id) => {

    setToasts((prev) => prev.map((toast) => {
      if(toast.id == id) {
        toast.closing = true;
      }
      return toast
    }));

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id != id))
    }, 300);

  }, []);

  useEffect(() => {
    const toastEvent = (e) => {
      const { toast } = e.detail;
      toast.id = idRef.current++;

      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        removeToastById(toast.id);
      }, toast.duration || TOAST_DURATION);
    };

    onEvent("toast:push", toastEvent);

    return () => {
      offEvent("toast:push", toastEvent);
    };
  }, [removeToastById]);

  return (
    <div className={classes.toastContainer}>
      {toasts.map((toast) => (
        <div className={`${classes.toast} ${toast.closing ? classes.closing : ""}`} key={toast.id}>{toast.type == "newItem" && <NewItemToast toast={toast} />}</div>
      ))}
    </div>
  );
}

export default ToastContainer;
