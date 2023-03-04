import React from "react";
import burgetIngredients from "./burger-ingredients.module.css";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import PropTypes from "prop-types";

const BurgerIngredients = ({ data }) => {
    return (
        <div className={burgetIngredients.burger_ingredients}>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList />
            <BurgerIngredientsList data={data} />
        </div>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerIngredients;
