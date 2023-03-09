import React from "react";
import burgerConstructorList from "./burger-constructor-list.module.css";
import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorList = ({ data }) => {
    const elements = data.map(({ _id, name, price, image }) => {
        return (
            <li className="mr-2 mb-4" key={_id}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    extraClass="ml-3"
                />
            </li>
        );
    });

    return (
        <ul className={`${burgerConstructorList.list} custom-scroll`}>
            {elements}
        </ul>
    );
};

BurgerConstructorList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default BurgerConstructorList;
