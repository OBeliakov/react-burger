import React from "react";
import orderDetailsStyle from "./order-details.module.css";
import confirmImagePath from "../../images/done.png";

const OrderDetails = () => {
    return (
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
    );
};

export default OrderDetails;
