import React, { Fragment } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../../components/app-header/app-header";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";

export const ProfilePage = () => {
    const linkActiveClass = `${styles.active} ${styles.nav_link}  text text_type_main-medium`;
    const linkClass = `${styles.nav_link} text text_type_main-medium`;
    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <div className={`${styles.nav_container}  mr-15`}>
                    <nav>
                        <ul className={styles.list}>
                            <li className="pb-5 pt-5">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${linkActiveClass}`
                                            : `${linkClass}`
                                    }
                                >
                                    Профиль
                                </NavLink>
                            </li>
                            <li className="pb-5 pt-5">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${linkActiveClass}`
                                            : `${linkClass}`
                                    }
                                    to="/orders"
                                >
                                    История заказов
                                </NavLink>
                            </li>
                            <li className="pb-5 pt-5">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${linkActiveClass}`
                                            : `${linkClass}`
                                    }
                                    to="/logout"
                                >
                                    {" "}
                                    Выход
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <p className="mt-20 text text_type_main-default text_color_inactive">
                        В этом разделе вы можете изменить свои персональные
                        данные
                    </p>
                </div>
                <form className={styles.user_info}>
                    <Input
                        type="text"
                        extraClass="mb-6"
                        placeholder="Имя"
                        icon={"EditIcon"}
                        value="Марк"
                    />
                    <Input
                        type="email"
                        extraClass="mb-6"
                        placeholder="E-mail"
                        icon={"EditIcon"}
                        value="mail@stellar.burgers"
                    />
                    <Input
                        type="password"
                        icon={"EditIcon"}
                        placeholder="Пароль"
                        value="******"
                        extraClass="mb-6"
                    />
                    <div className={styles.buttons}>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                        >
                            Отмена
                        </Button>
                        <Button htmlType="button" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
