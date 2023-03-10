import React from "react";
import ingredientDetailsStyle from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ currentIngredient }) => {
    const generateMarkup = (element) => {
        const { image, name, calories, carbohydrates, proteins, fat } = element;

        return (
            <div
                className={`${ingredientDetailsStyle.ingredient_card} pl-25 pr-25`}
            >
                <img
                    className={ingredientDetailsStyle.ingredient_image}
                    src={image}
                    alt={name}
                />
                <h3 className="pt-4 pb-8 text text_type_main-medium">{name}</h3>
                <ul className={`${ingredientDetailsStyle.nutrients_list}`}>
                    <li className="mr-5">
                        <p className="text text_type_main-default text_color_inactive">
                            Калории,ккал
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {calories}
                        </p>
                    </li>
                    <li className="mr-5">
                        <p className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {proteins}
                        </p>
                    </li>
                    <li className="mr-5">
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {fat}
                        </p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {carbohydrates}
                        </p>
                    </li>
                </ul>
            </div>
        );
    };

    const modalBody = generateMarkup(currentIngredient);

    return modalBody;
};

IngredientDetails.propTypes = {
    currentIngredient: PropTypes.object,
};

export default IngredientDetails;
