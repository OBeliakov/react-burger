import React, { useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("burger-modals");

const Modal = ({ modalTitle, className, closeModal, children }) => {
    const handleClick = () => {
        closeModal(false);
    };

    const onEscClick = (e) => {
        if (e.key === "Escape") {
            closeModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onEscClick);

        return () => {
            document.removeEventListener("keydown", onEscClick);
        };
    }, []);

    return createPortal(
        <>
            <ModalOverlay closeModal={handleClick}>
                <div className={`${modalStyles.modal} ${className}`}>
                    <ModalHeader>
                        {modalTitle && (
                            <h2 className="text text_type_main-large">
                                {modalTitle}
                            </h2>
                        )}
                        <button
                            className={modalStyles.close_btn}
                            onClick={handleClick}
                        >
                            <CloseIcon />
                        </button>
                    </ModalHeader>
                    {children}
                </div>
            </ModalOverlay>
        </>,
        modalRoot
    );
};

export default Modal;
