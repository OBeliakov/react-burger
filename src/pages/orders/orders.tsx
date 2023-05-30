import React from "react";
import styles from "./orders.module.css";
import NavigationMenu from "../../components/navigation-menu/navigation-menu";
import BurgerOrderList from "../../components/burger-order-list/burger-order-list";
import { useDispatch, useSelector } from "../../components/hooks/hooks";
import { useEffect } from "react";
import {
  FEED_ORDER_CONNECT,
  FEED_ORDER_DISCONNECT,
  WS_BASE,
} from "../../services/constants";

export const OrderPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const pureToken = localStorage.getItem("accessToken");
    const token = pureToken?.split(" ")[1];
    dispatch({
      type: FEED_ORDER_CONNECT,
      payload: `${WS_BASE}/orders?token=${token}`,
    });
    return () => {
      dispatch({
        type: FEED_ORDER_DISCONNECT,
        payload: "disconnect",
      });
    };
  }, []);

  const orders = useSelector((store) => store.feedOrderReducer.ordersList);

  return (
    <div className={styles.container}>
      <NavigationMenu desc="Лента ваших заказов" />
      <BurgerOrderList orders={orders} to="profile/orders" />
    </div>
  );
};
