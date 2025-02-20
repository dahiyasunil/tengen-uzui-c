import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Modal({ openModal, closeModal, ChildComponent, route }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      ref.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      ref.current?.close();
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="w-full overflow-hidden rounded bg-beige-100 backdrop:bg-grey-100/70 backdrop:backdrop-blur-sm sm:w-1/2 xl:w-1/4"
    >
      <div className="relative py-10">
        <button
          className="absolute right-1 top-2 px-2 outline-none"
          onClick={closeModal}
        >
          <XMarkIcon className="m-0.5 size-6 text-grey-100 transition duration-200 hover:animate-pulse hover:text-grey-500" />
        </button>
        <div className="px-10 pt-4">
          <ChildComponent closeModal={closeModal} route={route} />
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
