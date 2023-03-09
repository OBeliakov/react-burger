import React from "react";
import burgerItem from "./burger-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerItem = ({ image, price, name }) => {
    return (
        <div className={`${burgerItem.card} mb-10 ml-3 mr-3`}>
            <Counter count={1} extraClass={burgerItem.counter} />
            <img className="ml-4 mr-4" src={image} alt={name} />
            <p className={`${burgerItem.price} mt-1 mb-1`}>
                <span className="text text_type_digits-default mr-2">
                    {price}
                </span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={`${burgerItem.name} text text_type_main-default`}>
                {name}
            </p>
        </div>
    );
};

BurgerItem.propTypes = {
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
};

export default BurgerItem;
