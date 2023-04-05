import React, { Fragment, useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordUpdate } from "../../components/services/actions/actions";
import { _apiBase } from "../../components/services/constants";

export const ResetPasswordPage = () => {
    const [formValues, setFormValues] = useState({ password: "", token: "" });
    const navigate = useNavigate();

    const changeInputValue = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const _resetPwdUrl = `${_apiBase}/password-reset/reset`;

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(passwordUpdate(_resetPwdUrl, formValues));
    };

    const formSuccess = useSelector((store) => store.updateFormSuccess);

    if (formSuccess) {
        navigate("/", {
            replace: true,
        });
    }
    return (
        <>
            <AppHeader />
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <form onSubmit={submitForm} action="" className={styles.form}>
                    <Input
                        name="password"
                        type="password"
                        icon={"ShowIcon"}
                        placeholder="Введите новый пароль"
                        extraClass="mt-6"
                        onChange={changeInputValue}
                        value={formValues.password}
                    />
                    <Input
                        name="token"
                        type="text"
                        extraClass="mt-6"
                        placeholder="Введите код из письма"
                        value={formValues.code}
                        onChange={changeInputValue}
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium"
                    >
                        Сохранить
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
