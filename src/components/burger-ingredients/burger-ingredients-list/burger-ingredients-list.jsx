import React, { Fragment, useContext } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import BurgerItem from "./burger-item/burger-item";
import PropTypes from "prop-types";
import {
    ConstructorDataContext,
    IngredientsDataContext,
} from "../../services/appContext";

const BurgerIngredientsList = ({ data }) => {
    const { burgerConstructorState, updateBurgerConstructorState } = useContext(
        ConstructorDataContext
    );

    const { setActiveIngredient, onHandleModal } = useContext(
        IngredientsDataContext
    );

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
        setActiveIngredient(item);
        updateBurgerConstructorState({
            type: "ADD",
            payload: [...burgerConstructorState.ingredients, item],
        });

        onHandleModal(true, "ingredients");
    };

    const ingredientsType = data[0].type;

    const buildLayout = (string) => {
        return (
            <>
                {data && ingredientsType ? (
                    <>
                        {addTitle(ingredientsType)}
                        <ul
                            className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`}
                        >
                            {data
                                .filter((item) => {
                                    return item.type === string;
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

    return (
        <div className={`${burgerIngredientsList.container} custom-scroll`}>
            {buildLayout(ingredientsType)}
        </div>
    );
};

BurgerIngredientsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default BurgerIngredientsList;
