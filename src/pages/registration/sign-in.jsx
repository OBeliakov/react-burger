import React, { Fragment, useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUser } from "../../components/services/actions/actions";
import { _apiBase } from "../../components/services/constants";

export const SignInPage = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const changeInputValue = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const _loginUrl = `${_apiBase}/auth/login`;

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(loginUser(_loginUrl, formValues));
    };

    const formSuccess = useSelector((store) => store.loginFormSuccess);
    const navigate = useNavigate();

    if (formSuccess) {
        navigate("/", {
            replace: true,
        });
    }
    const { email, password } = formValues;
    return (
        <>
            <AppHeader />
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <form action="" className={styles.form} onSubmit={submitForm}>
                    <Input
                        type="email"
                        name="email"
                        extraClass="mt-6"
                        placeholder="E-mail"
                        value={email}
                        onChange={changeInputValue}
                    />
                    <Input
                        type="password"
                        name="password"
                        icon={"ShowIcon"}
                        placeholder="Password"
                        extraClass="mt-6"
                        value={password}
                        onChange={changeInputValue}
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
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
                        to="/register"
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
                        to="/forgot-password"
                    >
                        Восстановить пароль
                    </Link>
                </div>
            </div>
        </>
    );
};