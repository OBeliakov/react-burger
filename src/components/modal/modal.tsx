import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_ACTIVE_INGREDIENT } from "../../services/actions/ingredientsActions";
import { CLOSE_MODAL } from "../../services/actions/modalActions";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("burger-modals") as HTMLElement;

type TModalProps = {
  modalTitle?: string;
  className: string;
  children: JSX.Element;
};

const Modal = ({
  modalTitle,
  className,
  children,
}: TModalProps): JSX.Element | null => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: {} });
    navigate("/", { replace: true });
  };

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
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
    <ModalOverlay handleCloseModal={handleOverlayClick}>
      <div className={`${modalStyles.modal} ${className}`}>
        <ModalHeader>
          <>
            {modalTitle && (
              <h2 className="text text_type_main-large">{modalTitle}</h2>
            )}
            <button
              className={modalStyles.close_btn}
              onClick={handleCloseModal}
            >
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
