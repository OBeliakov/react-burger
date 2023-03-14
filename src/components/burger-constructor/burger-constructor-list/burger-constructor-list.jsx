import React, { useContext } from "react";
import burgerConstructorList from "./burger-constructor-list.module.css";
import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorDataContext } from "../../services/appContext";

const BurgerConstructorList = () => {
    const { burgerConstructorState, updateBurgerConstructorState } = useContext(
        ConstructorDataContext
    );

    const data = burgerConstructorState.ingredients;

    const removeElement = (index) => {
        updateBurgerConstructorState({
            type: "REMOVE",
            payload: [...data.slice(0, index), ...data.slice(index + 1)],
        });
    };
    const elements = (
        <>
            <ul
                className={`${burgerConstructorList.list} ${
                    !data.length ? burgerConstructorList.list_empty : null
                } : null custom-scroll`}
            >
                {!!data.length &&
                    data.map(({ _id, name, price, image }, index) => {
                        return (
                            <li className="mr-2 mb-4" key={_id}>
                                <div
                                    className={burgerConstructorList.container}
                                >
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={name}
                                        price={price}
                                        thumbnail={image}
                                        extraClass="ml-3"
                                        handleClose={() => removeElement(index)}
                                    />
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </>
    );

    return elements;
};

BurgerConstructorList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default BurgerConstructorList;
