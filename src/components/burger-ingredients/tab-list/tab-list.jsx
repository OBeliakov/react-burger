import React, { useState } from "react";
import tabList from "./tab-list.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const TabList = ({ getActiveType }) => {
    const [current, setCurrent] = useState("bun");

    const handleClick = (value) => {
        setCurrent(value);
        getActiveType(value);
    };

    return (
        <div className={`${tabList.tab_list} mb-10`}>
            <Tab value="bun" active={current === "bun"} onClick={handleClick}>
                Булки
            </Tab>
            <Tab
                value="sauce"
                active={current === "sauce"}
                onClick={handleClick}
            >
                Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={handleClick}>
                Начинки
            </Tab>
        </div>
    );
};

TabList.propTypes = {
    getActiveType: PropTypes.func,
};

export default TabList;
