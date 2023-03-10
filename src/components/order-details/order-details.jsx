import React from "react";
import orderDetailsStyle from "./order-details.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import confirmImagePath from "../../images/done.png";

const OrderDetails = ({ closeModal }) => {
    return (
        <Modal className="pt-15 pl-25 pb-30 pr-10" closeModal={closeModal}>
            <div className={`${orderDetailsStyle.container} pt-15`}>
                <p className="text text_type_digits-large pb-8">034536</p>
                <p className="text text_type_main-medium pb-15">
                    идентификатор заказа
                </p>
                <img
                    className="mb-15"
                    src={confirmImagePath}
                    alt="Подтвеждение заказа"
                />
                <p className="text text_type_main-default pb-2">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </Modal>
    );
};

OrderDetails.propTypes = {
    closeModal: PropTypes.func,
};

export default OrderDetails;
