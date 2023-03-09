import React, { Fragment } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import BurgerItem from "./burger-item/burger-item";
import PropTypes from "prop-types";

const BurgerIngredientsList = (props) => {
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

    const buildLayout = (string) => {
        return (
            <>
                {addTitle(string)}
                <ul className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`}>
                    {props.data
                        .filter((item) => {
                            return item.type === string;
                        })
                        .map(({ _id, image, name, price }) => {
                            return (
                                <li key={_id}>
                                    <BurgerItem
                                        image={image}
                                        name={name}
                                        price={price}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </>
        );
    };

    return (
        <div className={`${burgerIngredientsList.container} custom-scroll`}>
            {buildLayout("bun")}
            {buildLayout("sauce")}
            {buildLayout("main")}
        </div>
    );
};

BurgerIngredientsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default BurgerIngredientsList;
