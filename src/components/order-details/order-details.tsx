import React, { Fragment } from "react";
import orderDetailsStyle from "./order-details.module.css";
import confirmImagePath from "../../images/done.png";
import { useSelector } from "../hooks/hooks";
import Preloader from "../../images/Gear-0.2s-200px.svg";

const OrderDetails = () => {
  const order = useSelector((store) => store.orderReducer.order);

  return (
    <div className={`${orderDetailsStyle.container} pt-15`}>
      {order ? (
        <>
          <p className="text text_type_digits-large pb-8">{order.number}</p>
          <p data-cy="order text" className="text text_type_main-medium pb-15">
            идентификатор заказа
          </p>
        </>
      ) : (
        <>
          <img src={Preloader} alt="preloader" />
          <p data-cy="order load" className="text text_type_main-medium pb-15">
            Оформляем ваш заказ...
          </p>
        </>
      )}

      <img className="mb-15" src={confirmImagePath} alt="Подтвеждение заказа" />
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
