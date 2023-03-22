import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";
import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = () => {
    const { constructorIngredients, orderModal, ingredientsData, orderFailed } =
        useSelector((store) => store);
    const bunData = ingredientsData.find((item) => item.type === "bun");
    const finalPrice =
        constructorIngredients.reduce((accum, item) => accum + item.price, 0) +
        bunData.price * 2;
    const { image, name, price } = bunData;

    return (
        <div className="ml-20 mt-25">
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${name} (верх)`}
                price={price}
                thumbnail={image}
                extraClass="ml-2"
            />
            <BurgerConstructorList />
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${name} (низ)`}
                price={price}
                thumbnail={image}
                extraClass="ml-2"
            />
            <OrderingInfo finalPrice={finalPrice} />
            {orderModal && !orderFailed && (
                <Modal className="pt-15 pl-25 pb-30 pr-10">
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
};

export default BurgerConstructor;
