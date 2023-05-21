import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { submitOrder } from "../../../services/actions/orderActions";
import { API_BASE, OPEN_ORDER_MODAL } from "../../../services/constants";
import { TIngredient } from "../../../utils/types/types";
import { useNavigate } from "react-router-dom";

const OrderingInfo = ({ finalPrice }: { finalPrice: number }): JSX.Element => {
  const _orderUrl = `${API_BASE}/orders`;
  const constructorIngredients = useSelector(
    (store) => store.ingredientsReducer.constructorIngredients
  );

  const bun = useSelector((store) => store.ingredientsReducer.bun);
  const user = useSelector((store) => store.formReducer.userInfo);

  const ingredientsIdArray = constructorIngredients.map(
    (item: TIngredient) => item._id
  );
  const resultIdArr = bun
    ? [bun._id, ...ingredientsIdArray, bun._id]
    : [...ingredientsIdArray];
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const makeOrder = () => {
    if (user) {
      if (bun) {
        dispatch(submitOrder(_orderUrl, resultIdArr));
        dispatch({ type: OPEN_ORDER_MODAL });
      } else {
        alert("Добавьте булочку в заказ :)");
      }
    } else {
      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <div className={`${orderingInfo.ordering_info} mt-10`}>
      <span className="text text_type_digits-medium mr-2">{finalPrice}</span>
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

export default OrderingInfo;
