import React, { Fragment } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import BurgerItem from "./burger-item/burger-item";
import PropTypes from "prop-types";

const BurgerIngredientsList = ({ data, getActiveIngredient, openModal }) => {
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
        getActiveIngredient(item);
        openModal(true, "ingredients");
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
    getActiveIngredient: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default BurgerIngredientsList;
