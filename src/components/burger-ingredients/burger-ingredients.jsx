import React from "react";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import PropTypes from "prop-types";

const BurgerIngredients = ({
    data,
    getActiveIngredient,
    openModal,
    getActiveType,
}) => {
    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList data={data} getActiveType={getActiveType} />
            <BurgerIngredientsList
                getActiveIngredient={getActiveIngredient}
                openModal={openModal}
                data={data}
            />
        </div>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    getActiveIngredient: PropTypes.func,
    openModal: PropTypes.func,
    getActiveType: PropTypes.func,
};

export default BurgerIngredients;
