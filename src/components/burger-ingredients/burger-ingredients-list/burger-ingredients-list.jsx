import React, { Fragment } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import BurgerItem from "./burger-item/burger-item";
import {
    ADD_INGREDIENT,
    SET_ACTIVE_INGREDIENT,
    OPEN_INGREDIENTS_MODAL,
} from "../../services/actions";
import { useSelector, useDispatch } from "react-redux";

const BurgerIngredientsList = () => {
    const { ingredientsData, constructorIngredients } = useSelector(
        (store) => store
    );

    const dispatch = useDispatch();

    const addTitle = (string) => {
        let title = "";
        if (string === "bun") {
            title = "Булки";
        } else if (string === "sauce") {
            title = "Соусы";
        } else {
            title = "Начинки";
        }

        return <h3 className="text text_type_main-medium mb-6">{title}</h3>;
    };

    const handleClick = (item) => {
        dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: item });
        dispatch({
            type: ADD_INGREDIENT,
            payload: [...constructorIngredients, item],
        });
        dispatch({ type: OPEN_INGREDIENTS_MODAL });
    };

    const ingredientsType = ingredientsData[0].type;

    const buildLayout = (string) => {
        return (
            <>
                {ingredientsData && string ? (
                    <>
                        {addTitle(string)}
                        <ul
                            className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`}
                        >
                            {ingredientsData.map((item) => {
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

    return (
        <div className={`${burgerIngredientsList.container} custom-scroll`}>
            {buildLayout(ingredientsType)}
        </div>
    );
};

export default BurgerIngredientsList;
