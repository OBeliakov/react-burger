import React from "react";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER_MODAL, submitOrder } from "../../services/actions/actions";
import { API_BASE } from "../../services/constants";

const OrderingInfo = ({ finalPrice }) => {
    const _orderUrl = `${API_BASE}/orders`;
    const constructorIngredients = useSelector(
        (store) => store.constructorIngredients
    );
    const bun = useSelector((store) => store.bun);

    const user = useSelector((store) => store.userInfo);

    const ingredientsIdArray = constructorIngredients.map((item) => item._id);
    const resultIdArr = bun
        ? [bun._id, ...ingredientsIdArray, bun._id]
        : [...ingredientsIdArray];
    const dispatch = useDispatch();

    const makeOrder = () => {
        if (user) {
            dispatch(submitOrder(_orderUrl, resultIdArr));
            dispatch({ type: OPEN_ORDER_MODAL });
        } else {
            alert("Вы должны быть авторизованы!");
        }
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
