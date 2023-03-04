import React, { useState } from "react";
import tabList from "./tab-list.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const TabList = () => {
    const [current, setCurrent] = useState("bun");
    return (
        <div className={`${tabList.tab_list} mb-10`}>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab
                value="sauce"
                active={current === "sauce"}
                onClick={setCurrent}
            >
                Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
};

export default TabList;
