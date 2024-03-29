import React from "react";
import ingredientDetailsStyle from "./ingredient-details.module.css";
import { useSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../utils/types/types";

const IngredientDetails = (): JSX.Element | null => {
  const { ingredientId } = useParams();

  const ingredientsData = useSelector(
    (store) => store.ingredientsReducer.ingredientsData
  );

  const currentOpened = useSelector(
    (store) => store.ingredientsReducer.currentIngredient
  );
  const currentIngredient = ingredientId
    ? ingredientsData.find((item: TIngredient) => item._id === ingredientId)
    : currentOpened;

  const generateMarkup = (element: TIngredient | null) => {
    if (element) {
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
          <h3 data-cy="ingredient title" className="pt-4 pb-8 text text_type_main-medium">{name}</h3>
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
    }
    return null;
  };

  const modalBody = currentIngredient && generateMarkup(currentIngredient);
  return modalBody || null;
};

export default IngredientDetails;
