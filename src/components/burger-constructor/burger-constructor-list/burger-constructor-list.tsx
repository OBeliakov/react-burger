import React from "react";
import burgerConstructorList from "./burger-constructor-list.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useDrop } from "react-dnd";
import BurgerConstructorListItem from "./burger-constructor-list-item/burger-contructor-list-item";
import { SORT_INGREDIENTS_ON_DRAG } from "../../../services/constants";
import { TConstructorIngredient, TDropType } from "../../../utils/types/types";

const BurgerConstructorList = ({ onDrop }: TDropType) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: ["main", "sauce"],
    drop(item: TConstructorIngredient) {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const constructorIngredients = useSelector(
    (store) => store.ingredientsReducer.constructorIngredients
  );

  const dispatch = useDispatch();

  const moveIngredient = (dragIdx: number, hoverIdx: number) => {
    const dragIngredient = constructorIngredients[dragIdx];
    const newArr = [...constructorIngredients];
    newArr.splice(dragIdx, 1);
    newArr.splice(hoverIdx, 0, dragIngredient);
    dispatch({
      type: SORT_INGREDIENTS_ON_DRAG,
      payload: newArr,
    });
  };

  const elements = (
    <div>
      {constructorIngredients.length ? (
        <ul
          ref={dropRef}
          className={`${burgerConstructorList.list}  custom-scroll`}
        >
          {constructorIngredients.map(
            (item: TConstructorIngredient, index: number) => {
              return (
                <li key={item.key}>
                  <BurgerConstructorListItem
                    moveIngredient={moveIngredient}
                    item={item}
                    index={index}
                  />
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <ul
          className={`${burgerConstructorList.list} ${burgerConstructorList.list_empty}`}
          ref={dropRef}
        >
          <li
            className={`${burgerConstructorList.empty} constructor-element mt-4 mr-2 `}
          >
            Добавьте ингредиенты сюда
          </li>
        </ul>
      )}
    </div>
  );

  return elements;
};

export default BurgerConstructorList;
