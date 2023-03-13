import React, { useContext } from "react";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import PropTypes from "prop-types";
import { IngredientsDataContext } from "../../services/appContext";

const OrderingInfo = ({ finalPrice, openModal, submitOrder }) => {
    const _orderUrl = "https://norma.nomoreparties.space/api/orders";
    const ingredients = useContext(IngredientsDataContext);
    const idArray = ingredients.map((item) => item._id);

    const makeOrder = () => {
        submitOrder(_orderUrl, idArray);
        openModal(true, "order");
    };

    return (
        <div className={`${orderingInfo.ordering_info} mt-10`}>
            <span className="text text_type_digits-medium mr-2">
                {finalPrice}
            </span>
            <CurrencyIcon type="primary" />
            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="ml-10 mr-3"
                onClick={makeOrder}
            >
                Оформить заказ
            </Button>
        </div>
    );
};

OrderingInfo.propTypes = {
    finalPrice: PropTypes.number,
    submitOrder: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default OrderingInfo;
