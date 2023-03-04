import React from "react";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import PropTypes from "prop-types";

const OrderingInfo = ({ finalPrice }) => {
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
