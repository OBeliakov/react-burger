import React from "react";
import styles from "./order-report.module.css";
import { useSelector } from "../hooks/hooks";

export const OrderReport = () => {
  const orders = useSelector((store) => store.feedReducer.ordersList);
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className="mr-9">
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>

          <ul>
            {orders
              .filter((item) => {
                return item.status === "done";
              })
              .map((item) => {
                return (
                  <li
                    className={`${styles.text} text text_type_digits-default mb-2`}
                  >
                    {item.number}
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В Работе:</h2>
          <ul>
            {orders
              .filter((item) => {
                return item.status !== "done";
              })
              .map((item) => {
                return (
                  <li
                    className={`${styles.text} text text_type_digits-default mb-2`}
                  >
                    {item.number}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <h2 className="text text_type_main-medium mb-6">
        Выполнено за все время:
      </h2>
      <p className="text text_type_digits-large mb-15">28 752</p>

      <h2 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h2>
      <p className="text text_type_digits-large">138</p>
    </div>
  );
};
