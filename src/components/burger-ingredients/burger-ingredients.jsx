import React, { useContext, useState } from "react";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import PropTypes from "prop-types";
import { IngredientsDataContext } from "../services/appContext";

const BurgerIngredients = ({ getActiveIngredient, openModal }) => {
    const [ingredientType, setType] = useState("bun");
    const data = useContext(IngredientsDataContext);
    const filteredItems = data.filter((item) => item.type === ingredientType);
    
    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList getActiveType={setType} />
            <BurgerIngredientsList
                getActiveIngredient={getActiveIngredient}
                openModal={openModal}
                data={filteredItems}
            />
        </div>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    getActiveIngredient: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    getActiveType: PropTypes.func.isRequired,
};

export default BurgerIngredients;
