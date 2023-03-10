import React from "react";
import ingredientDetailsStyle from "./ingredient-details.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";

const IngredientDetails = ({ currentIngredient, closeModal }) => {
    const modalTitle = `Детали ингредиента`;

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

    return (
        <Modal
            modalTitle={modalTitle}
            className="pt-10 pl-10 pb-15 pr-10"
            closeModal={closeModal}
        >
            {modalBody}
        </Modal>
    );
};

IngredientDetails.propTypes = {
    currentIngredient: PropTypes.object,
    closeModal: PropTypes.func,
};

export default IngredientDetails;
