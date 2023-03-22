import React from "react";
import burgerConstructorList from "./burger-constructor-list.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_INGREDIENT } from "../../services/actions";

const BurgerConstructorList = () => {
    const { constructorIngredients } = useSelector((store) => store);
    const dispatch = useDispatch();

    const removeElement = (index) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            payload: [
                ...constructorIngredients.slice(0, index),
                ...constructorIngredients.slice(index + 1),
            ],
        });
    };

    const elements = (
        <>
            <ul
                className={`${burgerConstructorList.list} ${
                    !constructorIngredients.length
                        ? burgerConstructorList.list_empty
                        : null
                } : null custom-scroll`}
            >
                {!!constructorIngredients.length &&
                    constructorIngredients.map(
                        ({ _id, name, price, image }, index) => {
                            return (
                                <li className="mr-2 mb-4" key={_id}>
                                    <div
                                        className={
                                            burgerConstructorList.container
                                        }
                                    >
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={name}
                                            price={price}
                                            thumbnail={image}
                                            extraClass="ml-3"
                                            handleClose={() =>
                                                removeElement(index)
                                            }
                                        />
                                    </div>
                                </li>
                            );
                        }
                    )}
            </ul>
        </>
    );

    return elements;
};

export default BurgerConstructorList;
