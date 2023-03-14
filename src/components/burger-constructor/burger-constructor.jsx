import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";
import {
    IngredientsDataContext,
    ConstructorDataContext,
} from "../services/appContext";

const BurgerConstructor = ({ openModal, submitOrder }) => {
    const { burgerConstructorState } = useContext(ConstructorDataContext);
    const ingredientsData = useContext(IngredientsDataContext);
    const { ingredients } = burgerConstructorState;

    const bunData = ingredientsData.find((item) => item.type === "bun");
    const finalPrice =
        ingredients.reduce((accum, item) => accum + item.price, 0) +
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
            <OrderingInfo
                openModal={openModal}
                finalPrice={finalPrice}
                submitOrder={submitOrder}
            />
        </div>
    );
};

BurgerConstructor.propTypes = {
    submitOrder: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
