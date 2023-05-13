import React from "react";
import styles from "./burger-order-expanded.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerCardExpanded = () => {
  return (
    <div className={styles.container}>
      <p
        className={`mb-10 text text_type_digits-default ${styles.order_number}`}
      >
        #034533
      </p>
      <h2 className="mb-3 text text_type_main-medium">
        Black Hole Singularity острый бургер
      </h2>
      <p className={`mb-15 text text_type_main-default ${styles.status}`}>
        Выполнен
      </p>
      <p className="mb-6 text text_type_main-medium">Состав:</p>
      <ul className={`${styles.list} mb-10 custom-scroll`}>
        <li className={`${styles.item} mb-4`}>
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
          <p className={`${styles.name} text text_type_main-default`}>
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">2x20</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={`${styles.item} mb-4`}>
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
          <p className={`${styles.name} text text_type_main-default`}>
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">2x20</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={`${styles.item} mb-4`}>
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
          <p className={`${styles.name} text text_type_main-default`}>
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">2x20</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={`${styles.item} mb-4`}>
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
          <p className={`${styles.name} text text_type_main-default`}>
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">2x20</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={`${styles.item} mb-4`}>
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
          <p className={`${styles.name} text text_type_main-default`}>
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">2x20</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={`${styles.item} mb-4`}>
          <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
          <p className={`${styles.name} text text_type_main-default`}>
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">2x20</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
      </ul>
      <div className={styles.info_column}>
        <span className="text text_type_main-default text_color_inactive">
          Вчера, 13:50
        </span>
        <span className={styles.price}>
          <span className="text text_type_digits-default">510</span>
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};
