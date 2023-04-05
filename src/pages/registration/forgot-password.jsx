import React, { Fragment, useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { passwordReset } from "../../components/services/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { _apiBase } from "../../components/services/constants";

export const ForgotPasswordPage = () => {
    const [formValues, setFormValues] = useState({ email: "" });
    const navigate = useNavigate();

    const changeInputValue = (e) => {
        setFormValues({ ...formValues, email: e.target.value });
    };

    const _forgotPwdUrl = `${_apiBase}/password-reset`;

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(passwordReset(_forgotPwdUrl, formValues.email));
    };

    const formSuccess = useSelector((store) => store.resetFormSuccess);

    if (formSuccess) {
        navigate("/reset-password", { replace: true });
    }

    return (
        <>
            <AppHeader />
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <form action="#" onSubmit={submitForm} className={styles.form}>
                    <Input
                        type="email"
                        extraClass="mt-6"
                        placeholder="Укажите E-mail"
                        value={formValues.email}
                        onChange={changeInputValue}
                    />
                    <Button
                        extraClass="mt-6"
                        type="primary"
                        size="medium"
                        htmlType="submit"
                    >
                        Восстановить
                    </Button>
                </form>
                <div className={`${styles.form_info} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="/login"
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </>
    );
};