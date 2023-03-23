import React from "react";
import burgerConstructorList from "./burger-constructor-list.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_INGREDIENT, DECREASE_INGREDIENT } from "../../services/actions";

const BurgerConstructorList = () => {
    const { constructorIngredients } = useSelector((store) => store);
    const dispatch = useDispatch();

    const removeElement = (item, index) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            payload: [
                ...constructorIngredients.slice(0, index),
                ...constructorIngredients.slice(index + 1),
            ],
        });

        dispatch({
            type: DECREASE_INGREDIENT,
            id: item._id,
        });
    };

    const elements = (
        <>
            <ul className={`${burgerConstructorList.list}  custom-scroll`}>
                {constructorIngredients.length ? (
                    constructorIngredients.map((item, index) => {
                        const { name, price, image, key } = item;
                        return (
                            <li className="mb-4" key={key}>
                                <div
                                    className={burgerConstructorList.container}
                                >
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={name}
                                        price={price}
                                        thumbnail={image}
                                        extraClass="ml-3"
                                        handleClose={() =>
                                            removeElement(item, index)
                                        }
                                    />
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li
                        className={`${burgerConstructorList.empty} constructor-element mr-2 mb-4`}
                    >
                        Добавьте ингредиенты сюда
                    </li>
                )}
            </ul>
        </>
    );

    return elements;
};

export default BurgerConstructorList;
