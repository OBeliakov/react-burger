import React from "react";
import { BurgerCardExpanded } from "../../components/burger-order-list/burger-order-expanded/burger-order-expanded";
import styles from "./order-card-page.module.css";

export const OrderCardPage = () => {
  return (
    <div className={styles.container}>
      <BurgerCardExpanded />
    </div>
  );
};
