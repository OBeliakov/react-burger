import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import burgerConstructorListItem from "./burger-constructor-list-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_INGREDIENT } from "../../../../services/constants";
import { useDispatch, useSelector } from "../../../hooks/hooks";
import { TConstructorIngredient } from "../../../../utils/types/types";

type TConstructorItemProps = {
  item: TConstructorIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
};

type TDragIngredientType = {
  _id: string;
  index: number;
};

const BurgerConstructorListItem = ({
  item,
  index,
  moveIngredient,
}: TConstructorItemProps) => {
  const { name, price, image, _id } = item;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag<
    TDragIngredientType,
    unknown,
    { isDragging: boolean }
  >({
    type: "ingredient",
    item: () => {
      return { _id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TDragIngredientType>({
    accept: "ingredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const constructorIngredients = useSelector(
    (store) => store.ingredientsReducer.constructorIngredients
  );

  const dispatch = useDispatch();

  const removeElement = (item: TConstructorIngredient, index: number) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: [
        ...constructorIngredients.slice(0, index),
        ...constructorIngredients.slice(index + 1),
      ],
    });
  };

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={`${burgerConstructorListItem.container} ${
        isDragging ? `${burgerConstructorListItem.hidden}` : ""
      } mt-4 mb-4`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        extraClass="constructor-ingredient ml-3"
        handleClose={() => removeElement(item, index)}
      />
    </div>
  );
};

export default BurgerConstructorListItem;
