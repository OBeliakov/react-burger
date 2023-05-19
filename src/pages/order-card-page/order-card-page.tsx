import React from "react";
import { BurgerCardExpanded } from "../../components/burger-order-list/burger-order-expanded/burger-order-expanded";
import styles from "./order-card-page.module.css";
import { TFeedOrder } from "../../utils/types/types";

export const OrderCardPage = (props: { order: TFeedOrder | null }) => {
  return (
    <div className={styles.container}>
      <BurgerCardExpanded order={props.order} />
    </div>
  );
};
