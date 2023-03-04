import React from "react";
import appHeader from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={appHeader.header}>
            <nav className={appHeader.nav}>
                <a
                    href="/#"
                    className={`${appHeader.link_active} pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}
                >
                    <BurgerIcon type="primary" />
                    <span className="ml-2">Конструктор</span>
                </a>
                <a
                    href="/#"
                    className={`${appHeader.link} ml-2 pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}
                >
                    <ListIcon type="secondary" />
                    <span className="ml-2">Лента заказов</span>
                </a>
                <a href="/#" className={appHeader.logo}>
                    <Logo />
                </a>
                <a
                    href="/#"
                    className={`${appHeader.link} pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}
                >
                    <ProfileIcon type="secondary" />
                    <span className="ml-2">Личный кабинет</span>
                </a>
            </nav>
        </header>
    );
};

export default AppHeader;
