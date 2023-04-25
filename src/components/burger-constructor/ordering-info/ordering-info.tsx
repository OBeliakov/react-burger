import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import { useDispatch, useSelector } from "react-redux";
import { submitOrder } from "../../../services/actions/orderActions";
import { OPEN_ORDER_MODAL } from "../../../services/actions/modalActions";
import { API_BASE } from "../../../services/constants";
import { TIngredient } from "../../../utils/types/types";

const OrderingInfo = ({ finalPrice }: { finalPrice: number }): JSX.Element => {
  const _orderUrl = `${API_BASE}/orders`;
  const constructorIngredients = useSelector(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (store) => store.ingredientsReducer.constructorIngredients
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const bun = useSelector((store) => store.ingredientsReducer.bun);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = useSelector((store) => store.formReducer.userInfo);

  const ingredientsIdArray = constructorIngredients.map(
    (item: TIngredient) => item._id
  );
  const resultIdArr = bun
    ? [bun._id, ...ingredientsIdArray, bun._id]
    : [...ingredientsIdArray];
  const dispatch = useDispatch();

  const makeOrder = () => {
    if (user) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(submitOrder(_orderUrl, resultIdArr));
      dispatch({ type: OPEN_ORDER_MODAL });
    } else {
      alert("Вы должны быть авторизованы!");
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
