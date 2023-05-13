import React from "react";
import styles from "./orders.module.css";
import NavigationMenu from "../../components/navigation-menu/navigation-menu";
import BurgerOrderList from "../../components/burger-order-list/burger-order-list";

export const OrderPage = () => {
  return (
    <div className={styles.container}>
      <NavigationMenu desc="Лента ваших заказов" />
      <BurgerOrderList />
    </div>
  );
};
