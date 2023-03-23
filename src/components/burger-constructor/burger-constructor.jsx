import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";
import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructor from "./burger-constructor.module.css";

const BurgerConstructor = () => {
    const { constructorIngredients, orderModal } = useSelector(
        (store) => store
    );
    const bunData = useSelector((store) => store.bun);
    const bunsPrice = bunData ? bunData.price * 2 : 0;
    const finalPrice =
        constructorIngredients.reduce((accum, item) => accum + item.price, 0) +
        bunsPrice;

    const { image, name, price } = bunData || {};

    const renderBun = (bunData, direction) => {
        if (bunData) {
            return (
                <ConstructorElement
                    type={direction === "верх" ? "top" : "bottom"}
                    isLocked={true}
                    text={`${name} (${direction})`}
                    price={price}
                    thumbnail={image}
                    extraClass="ml-2"
                />
            );
        }

        return (
            <div
                className={`${burgerConstructor.empty} constructor-element mr-2 mb-4`}
            >
                Положите булку сюда
            </div>
        );
    };
    return (
        <div className="ml-20 mt-25">
            {renderBun(bunData, "верх")}
            <BurgerConstructorList />
            {renderBun(bunData, "низ")}
            <OrderingInfo finalPrice={finalPrice} />
            {orderModal && (
                <Modal className="pt-15 pl-25 pb-30 pr-10">
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
};

export default BurgerConstructor;
