import React from "react";
import styles from "./order-report.module.css";

export const OrderReport = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className="mr-9">
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul>
            <li className={`${styles.text} text text_type_digits-default mb-2`}>
              034533
            </li>
            <li className={`${styles.text} text text_type_digits-default mb-2`}>
              034532
            </li>
            <li className={`${styles.text} text text_type_digits-default mb-2`}>
              034530
            </li>
            <li className={`${styles.text} text text_type_digits-default mb-2`}>
              034527
            </li>
            <li className={`${styles.text} text text_type_digits-default`}>
              034525
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В Работе:</h2>
          <ul>
            <li className="text text_type_digits-default">034538</li>
            <li className="text text_type_digits-default">034541</li>
            <li className="text text_type_digits-default">034542</li>
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
