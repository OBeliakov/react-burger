import React from "react";
import BurgerOrderList from "../../components/burger-order-list/burger-order-list";
import styles from "./feed.module.css";
import { OrderReport } from "../../components/order-report/order-report";

export const FeedPage = () => {
  return (
    <div className={styles.page_container}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={styles.container}>
        <div className={`${styles.list_container}`}>
          <BurgerOrderList />
        </div>
        <OrderReport />
      </div>
    </div>
  );
};
