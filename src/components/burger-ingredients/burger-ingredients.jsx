import React from "react";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = () => {
    const { ingredientsModal } = useSelector((store) => store);

    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList />
            <BurgerIngredientsList />
            {ingredientsModal && (
                <Modal
                    modalTitle="Детали ингредиента"
                    className="pt-10 pl-10 pb-15 pr-10"
                >
                    <IngredientDetails />
                </Modal>
            )}
        </div>
    );
};

export default BurgerIngredients;
