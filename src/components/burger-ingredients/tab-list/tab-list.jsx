import React, { forwardRef } from "react";
import tabList from "./tab-list.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const TabList = forwardRef(function TabList({ scrollByTabClick }, ref) {
    const current = useSelector((store) => store.ingredientsReducer.currentTab);
    const handleClick = (element) => {
        scrollByTabClick(element);
    };

    return (
        <div className={`${tabList.tab_list}`} ref={ref}>
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
});

TabList.propTypes = {
    scrollByTabClick: PropTypes.func.isRequired,
};

export default TabList;
