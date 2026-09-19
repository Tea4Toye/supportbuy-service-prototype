import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../bookings/BookingUI";

export default function Modal({ title, onClose, children, wide = false, className = "" }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return createPortal(<dialog ref={ref} aria-labelledby={titleId} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} className={`m-auto bg-transparent p-4 w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[95dvh] backdrop:bg-black/50 text-[#1E232A] ${className}`}><div className="bg-white rounded-2xl overflow-hidden shadow-xl"><div className="flex justify-between items-center gap-4 p-5 border-b border-gray-100 modal-actions"><h2 id={titleId} className="font-outfit font-semibold text-xl">{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><Icon>close</Icon></button></div>{children}</div></dialog>, document.body);
}
