import React, { forwardRef, Fragment } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import BurgerItem from "./burger-item/burger-item";
import {
  ADD_INGREDIENT,
  SET_ACTIVE_INGREDIENT,
  ADD_BUN,
  INCREASE_INGREDIENT,
} from "../../../services/actions/ingredientsActions";
import { OPEN_INGREDIENTS_MODAL } from "../../../services/actions/modalActions";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { TIngredient } from "../../../utils/types/types";

type TRef = HTMLDivElement | null;
type TIngredientsType = {
  ingredientsType: string;
};

const BurgerIngredientsList = forwardRef<TRef, TIngredientsType>(
  function BurgerIngredientsList({ ingredientsType }, ref) {
    const constructorIngredients = useSelector(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (store) => store.ingredientsReducer.constructorIngredients
    );
    const ingredientsData = useSelector(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (store) => store.ingredientsReducer.ingredientsData
    );

    const dispatch = useDispatch();

    const addTitle = (string: string) => {
      let title = "";

      switch (string) {
        case "bun":
          title = "Булки";
          break;
        case "sauce":
          title = "Соусы";
          break;
        case "main":
          title = "Начинки";
          break;
        default:
          title = "";
      }

      return (
        <h3 ref={ref} className="text text_type_main-medium mb-6">
          {title}
        </h3>
      );
    };

    const handleClick = (item: TIngredient) => {
      dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: item });
      if (item.type !== "bun") {
        dispatch({
          type: ADD_INGREDIENT,
          payload: [...constructorIngredients, { ...item, key: uuid() }],
        });
        dispatch({
          type: INCREASE_INGREDIENT,
          id: item._id,
        });
      } else {
        dispatch({
          type: ADD_BUN,
          payload: { ...item, qty: ++item.qty },
        });
      }
      dispatch({ type: OPEN_INGREDIENTS_MODAL });
    };

    const newData = ingredientsData.map((item: TIngredient) => {
      return { ...item, qty: 0 };
    });

    const buildLayout = (string: string) => {
      return (
        <>
          {ingredientsData && string ? (
            <>
              {addTitle(string)}
              <ul className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`}>
                {newData
                  .filter((item: TIngredient) => {
                    return item.type === ingredientsType;
                  })
                  .map((item: TIngredient): JSX.Element | null => {
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

    return <div>{buildLayout(ingredientsType)}</div>;
  }
);

export default BurgerIngredientsList;
