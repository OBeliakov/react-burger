import React, { Fragment } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Link } from "react-router-dom";

export const SignInPage = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <form action="" className={styles.form}>
                    <Input
                        type="email"
                        extraClass="mt-6"
                        placeholder="E-mail"
                    />
                    <Input
                        type="password"
                        icon={"ShowIcon"}
                        placeholder="Password"
                        extraClass="mt-6"
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="button"
                        type="primary"
                        size="medium"
                    >
                        Войти
                    </Button>
                </form>
                <div className={`${styles.form_info} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="/registration"
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                <div className={`${styles.form_info} mt-4`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="/registration/forgot-password"
                    >
                        Восстановить пароль
                    </Link>
                </div>
            </div>
        </>
    );
};
