import React, { useEffect, useRef, useState } from "react";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import burgerIngredients from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = () => {
    const { ingredientsModal } = useSelector((store) => store);
    const listRef = useRef(null);

    const [current, setCurrent] = useState("bun");

    const tabRef = useRef(null);
    const bunOptions = { type: "bun", ref: useRef(null) };
    const sauceOptions = { type: "sauce", ref: useRef(null) };
    const mainOptions = { type: "main", ref: useRef(null) };

    const setCurrentElement = (tabPos, element) => {
        const {
            ref: { current },
            type,
        } = element;

        if (tabPos - current.getBoundingClientRect().top >= 0) {
            setCurrent(type);
        }
    };

    const findScrollableEl = (obj, type) => {
        if (obj.type === type) {
            obj.ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const scrollByTabClick = (type) => {
        findScrollableEl(bunOptions, type);
        findScrollableEl(sauceOptions, type);
        findScrollableEl(mainOptions, type);
    };

    const handleScroll = () => {
        const tabsBottomPos = tabRef.current.getBoundingClientRect().bottom;
        setCurrentElement(tabsBottomPos, bunOptions);
        setCurrentElement(tabsBottomPos, sauceOptions);
        setCurrentElement(tabsBottomPos, mainOptions);
    };

    useEffect(() => {
        const listNode = listRef.current;
        listNode.addEventListener("scroll", handleScroll);

        return () => {
            listNode.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const buildListLayout = (obj) => {
        const { type, ref } = obj;
        return <BurgerIngredientsList ingredientsType={type} ref={ref} />;
    };

    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList
                scrollByTabClick={scrollByTabClick}
                current={current}
                ref={tabRef}
            />
            <div
                ref={listRef}
                className={`${burgerIngredients.container} custom-scroll pt-10`}
            >
                {buildListLayout(bunOptions)}
                {buildListLayout(sauceOptions)}
                {buildListLayout(mainOptions)}
            </div>
            {ingredientsModal && (
                <Modal
                    modalTitle="Детали ингредиента"
                    className="pt-10 pl-10 pb-15 pr-10"
                >
                    <IngredientDetails />
                </Modal>
            )}
        </div>
    );
};

export default BurgerIngredients;
