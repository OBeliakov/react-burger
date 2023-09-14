import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("burger-modals") as HTMLElement;

type TModalProps = {
  modalTitle?: string;
  className: string;
  children: JSX.Element;
  onClose: () => void;
};

const Modal = ({
  modalTitle,
  className,
  onClose,
  children,
}: TModalProps): JSX.Element | null => {
  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onEscClick);

    return () => {
      document.removeEventListener("keydown", onEscClick);
    };
  }, []);

  return createPortal(
    <ModalOverlay handleCloseModal={handleOverlayClick}>
      <div className={`${modalStyles.modal} ${className}`}>
        <ModalHeader>
          <>
            {modalTitle && (
              <h2 data-cy="title" className="text text_type_main-large">
                {modalTitle}
              </h2>
            )}
            <button data-cy="close" className={modalStyles.close_btn} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </>
        </ModalHeader>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
