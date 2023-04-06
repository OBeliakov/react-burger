import React, { Fragment, useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../../components/app-header/app-header";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    logOut,
    updateUserData,
} from "../../components/services/actions/actions";
import { _apiBase } from "../../components/services/constants";

export const ProfilePage = () => {
    const linkActiveClass = `${styles.active} ${styles.nav_link}  text text_type_main-medium`;
    const linkClass = `${styles.nav_link} text text_type_main-medium`;
    const user = useSelector((store) => store.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _logOutUrl = `${_apiBase}/auth/logout`;
    const [formValues, setFormValues] = useState({
        name: user.name,
        email: user.email,
        password: "",
    });

    const signOut = () => {
        dispatch(logOut(_logOutUrl));
        navigate("/login", { replace: true });
    };

    const changeInputValue = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const _updateUserUrl = `${_apiBase}/auth/user`;

    const changeUserData = (e) => {
        e.preventDefault();
        dispatch(updateUserData(_updateUserUrl, formValues));
    };

    const handleReset = () => {
        setFormValues({
            ...formValues,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    };

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
                                <button
                                    className={`${styles.logout_btn} text text_type_main-medium`}
                                    onClick={signOut}
                                >
                                    Выход
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <p className="mt-20 text text_type_main-default text_color_inactive">
                        В этом разделе вы можете изменить свои персональные
                        данные
                    </p>
                </div>
                <form onSubmit={changeUserData} className={styles.user_info}>
                    <Input
                        type="text"
                        name="name"
                        extraClass="mb-6"
                        placeholder="Имя"
                        icon={"EditIcon"}
                        value={formValues.name}
                        onChange={changeInputValue}
                    />
                    <Input
                        type="email"
                        name="email"
                        extraClass="mb-6"
                        placeholder="E-mail"
                        icon={"EditIcon"}
                        value={formValues.email}
                        onChange={changeInputValue}
                    />
                    <Input
                        type="password"
                        icon={"EditIcon"}
                        placeholder="Пароль"
                        value="******"
                        extraClass="mb-6"
                        onChange={changeInputValue}
                    />
                    <div className={styles.buttons}>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={handleReset}
                        >
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
