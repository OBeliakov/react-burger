import React from "react";
import burgerConstructorList from "./burger-constructor-list.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_INGREDIENT, DECREASE_INGREDIENT } from "../../services/actions";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

const BurgerConstructorList = ({ onDrop }) => {
    const { constructorIngredients } = useSelector((store) => store);
    const dispatch = useDispatch();

    const [{ isOver }, dropRef] = useDrop({
        accept: ["main", "sauce"],
        drop(itemId) {
            onDrop(itemId);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

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
            {constructorIngredients.length ? (
                <ul
                    ref={dropRef}
                    className={`${burgerConstructorList.list}  custom-scroll ${
                        isOver ? burgerConstructorList.hovered_block : ""
                    }`}
                >
                    {constructorIngredients.map((item, index) => {
                        const { name, price, image, key } = item;
                        return (
                            <li className="mt-4 mb-4" key={key}>
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
                    })}
                </ul>
            ) : (
                <ul
                    className={`${burgerConstructorList.list} ${burgerConstructorList.list_empty}`}
                    ref={dropRef}
                >
                    <li
                        className={`${
                            burgerConstructorList.empty
                        } constructor-element mt-4 mr-2 ${
                            isOver ? burgerConstructorList.hovered_block : ""
                        }`}
                    >
                        Добавьте ингредиенты сюда
                    </li>
                </ul>
            )}
        </>
    );

    return elements;
};

BurgerConstructorList.propTypes = {
    onDrop: PropTypes.func.isRequired,
};

export default BurgerConstructorList;
