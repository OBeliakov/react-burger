import React, { forwardRef, Fragment } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import BurgerItem from "./burger-item/burger-item";
import {
    ADD_INGREDIENT,
    SET_ACTIVE_INGREDIENT,
    OPEN_INGREDIENTS_MODAL,
} from "../../services/actions";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const BurgerIngredientsList = forwardRef(function BurgerIngredientsList(
    { ingredientsType },
    ref
) {
    const { ingredientsData, constructorIngredients } = useSelector(
        (store) => store
    );

    const dispatch = useDispatch();

    const addTitle = (string) => {
        let title = "";

        switch (string) {
            case "bun":
                title = "Булки";
                break;
            case "sauce":
                title = "Соусы";
                break;
            case "main":
                title = "Начинки";
                break;
            default:
                title = "";
        }

        return (
            <h3 ref={ref} className="text text_type_main-medium mb-6">
                {title}
            </h3>
        );
    };

    const handleClick = (item) => {
        dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: item });
        dispatch({
            type: ADD_INGREDIENT,
            payload: [...constructorIngredients, { ...item, key: uuid() }],
        });
        dispatch({ type: OPEN_INGREDIENTS_MODAL });
    };

    const buildLayout = (string, ref) => {
        return (
            <>
                {ingredientsData && string ? (
                    <>
                        {addTitle(string, ref)}
                        <ul
                            className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`}
                        >
                            {ingredientsData
                                .filter((item) => {
                                    return item.type === ingredientsType;
                                })
                                .map((item) => {
                                    return (
                                        <li
                                            key={item._id}
                                            onClick={() => handleClick(item)}
                                            aria-hidden="true"
                                        >
                                            <BurgerItem ingredient={item} />
                                        </li>
                                    );
                                })}
                        </ul>
                    </>
                ) : null}
            </>
        );
    };

    return <div>{buildLayout(ingredientsType, ref)}</div>;
});

BurgerIngredientsList.propTypes = {
    ingredientsType: PropTypes.string,
};

export default BurgerIngredientsList;
