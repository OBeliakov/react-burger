import React from "react";
import burgerItem from "./burger-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BurgerItem = ({ ingredient }) => {
    const { image, price, name } = ingredient;
    const { constructorIngredients } = useSelector((store) => store);
    const currentEl = constructorIngredients.find((item) => {
        return item._id === ingredient._id;
    });

    const counter = currentEl ? currentEl.qty : 0;

    return (
        <div className={`${burgerItem.card} mb-10 ml-3 mr-3`}>
            {!!counter && (
                <Counter count={counter} extraClass={burgerItem.counter} />
            )}
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
    ingredient: PropTypes.object.isRequired,
};

export default BurgerItem;
