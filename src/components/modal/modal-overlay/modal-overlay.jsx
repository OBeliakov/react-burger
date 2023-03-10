import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal, children }) => {
    return (
        <div
            className={modalOverlayStyles.overlay}
            onClick={closeModal}
            aria-hidden="true"
        >
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.node,
};

export default ModalOverlay;
