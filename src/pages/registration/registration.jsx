import React, { Fragment } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <form action="" className={styles.form}>
                    <Input type="text" extraClass="mt-6" placeholder="Имя" />
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
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={`${styles.form_info} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="login"
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </>
    );
};
