import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => {
    return (
        <div
            className={modalOverlayStyles.overlay}
            onClick={closeModal}
            aria-hidden="true"
        ></div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func,
};

export default ModalOverlay;
