import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className="mb-4 mt-4">
                <Logo />
            </div>
            <h1 className="mt-20 mb-20 text text_type_main-large">
                Этой страницы не существует
            </h1>

            <div className={`${styles.info} mt-10`}>
                <p className="mr-2 text text_type_main-default">
                    Не нашли того что искали?
                </p>

                <Link
                    className="text text_type_main-default text_color_inactive"
                    to="/"
                >
                    На главную
                </Link>
            </div>
        </div>
    );
};

export { NotFoundPage };
