import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";

const BurgerConstructor = ({ data, openModal }) => {
    const bunData = data.find((item) => item.type === "bun");
    const otherData = data.filter((item) => item.type !== "bun");
    const finalPrice = otherData.reduce((acc, item) => acc + item.price, 0);
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
            <BurgerConstructorList data={otherData} />
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${name} (низ)`}
                price={price}
                thumbnail={image}
                extraClass="ml-2"
            />
            <OrderingInfo openModal={openModal} finalPrice={finalPrice} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
