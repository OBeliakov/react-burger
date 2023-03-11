import React, { useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
const modalRoot = document.getElementById("burger-modals");

const Modal = ({ modalTitle, className, closeModal, children }) => {
    const handleCloseModal = () => {
        closeModal(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const onEscClick = (e) => {
            if (e.key === "Escape") {
                handleCloseModal();
            }
        };

        document.addEventListener("keydown", onEscClick);

        return () => {
            document.removeEventListener("keydown", onEscClick);
        };
    }, []);

    return createPortal(
        <>
            <ModalOverlay handleCloseModal={handleOverlayClick}>
                <div className={`${modalStyles.modal} ${className}`}>
                    <ModalHeader>
                        {modalTitle && (
                            <h2 className="text text_type_main-large">
                                {modalTitle}
                            </h2>
                        )}
                        <button
                            className={modalStyles.close_btn}
                            onClick={handleCloseModal}
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

Modal.propTypes = {
    modalTitle: PropTypes.string,
    className: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Modal;
