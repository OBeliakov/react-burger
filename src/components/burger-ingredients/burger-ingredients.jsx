import React, { useContext, useState } from "react";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import { IngredientsDataContext } from "../services/appContext";

const BurgerIngredients = () => {
    const [ingredientType, setType] = useState("bun");
    const { ingredientsData } = useContext(IngredientsDataContext);
    const filteredItems = ingredientsData.filter(
        (item) => item.type === ingredientType
    );

    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList getActiveType={setType} />
            <BurgerIngredientsList data={filteredItems} />
        </div>
    );
};

export default BurgerIngredients;
