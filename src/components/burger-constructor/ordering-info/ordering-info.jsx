import React from "react";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER_MODAL, submitOrder } from "../../services/actions";

const OrderingInfo = ({ finalPrice }) => {
    const _orderUrl = "https://norma.nomoreparties.space/api/orders";
    const { constructorIngredients } = useSelector((store) => store);
    const idArray = constructorIngredients.map((item) => item._id);
    const dispatch = useDispatch();

    const makeOrder = () => {
        dispatch(submitOrder(_orderUrl, idArray));
        dispatch({ type: OPEN_ORDER_MODAL });
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
};

export default OrderingInfo;
