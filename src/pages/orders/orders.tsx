import React from "react";
import styles from "./orders.module.css";
import NavigationMenu from "../../components/navigation-menu/navigation-menu";
import BurgerOrderList from "../../components/burger-order-list/burger-order-list";
import { useDispatch, useSelector } from "../../components/hooks/hooks";
import { useEffect } from "react";
import { FEED_CONNECT, FEED_DISCONNECT } from "../../services/constants";

export const OrderPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const pureToken = localStorage.getItem("accessToken");
    const token = pureToken!.split(" ")[1];
    dispatch({
      type: FEED_CONNECT,
      payload: `wss://norma.nomoreparties.space/orders/${token}`,
    });
    return () => {
      dispatch({
        type: FEED_DISCONNECT,
        payload: "disconnect",
      });
    };
  });

  const orders = useSelector((store) => store.feedReducer.ordersList);

  return (
    <div className={styles.container}>
      <NavigationMenu desc="Лента ваших заказов" />
      <BurgerOrderList orders={orders} to="orders" />
    </div>
  );
};
