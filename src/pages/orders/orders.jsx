import React from "react";
import AppHeader from "../../components/app-header/app-header";
import styles from "./orders.module.css";

export const OrderPage = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <h2 className="text text_type_main-large">
                    Раздел находится в разработке
                </h2>
            </div>
        </>
    );
};
