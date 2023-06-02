import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";
import { useDispatch, useSelector } from "../hooks/hooks";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructor from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { SET_ACTIVE_INGREDIENT, CLOSE_MODAL } from "../../services/constants";

import {
  TConstructorIngredient,
  TDropType,
  TIngredient,
} from "../../utils/types/types";

const BurgerConstructor = ({ onDrop }: TDropType): JSX.Element => {
  const constructorIngredients = useSelector(
    (store) => store.ingredientsReducer.constructorIngredients
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: null });
  };

  const orderModal = useSelector((store) => store.modalReducer.orderModal);

  const bunData = useSelector((store) => store.ingredientsReducer.bun);

  const bunsPrice = bunData ? bunData.price * 2 : 0;

  const finalPrice =
    constructorIngredients.reduce(
      (accum: number, item: TConstructorIngredient) => accum + item.price,
      0
    ) + bunsPrice;

  const [{ isHover }, dropRef] = useDrop({
    accept: "bun",
    drop(item: TIngredient) {
      onDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  type TValue = "top" | "bottom";
  type TBunType = TIngredient | null;

  const renderBun = (bunData: TBunType, direction: string) => {
    const addValueFromDir = (
      direction: string,
      fstValue?: TValue,
      scndValue?: TValue
    ) => {
      return direction === "верх" ? fstValue : scndValue;
    };

    const type = addValueFromDir(direction, "top", "bottom");
    if (bunData) {
      const { image, name, price } = bunData;

      return (
        <div
          className={`${
            isHover
              ? `${burgerConstructor.hovered_block} ${burgerConstructor.bun_container}`
              : ""
          } `}
        >
          <ConstructorElement
            type={type}
            isLocked={true}
            text={`${name} (${direction})`}
            price={price}
            thumbnail={image}
            extraClass="constructor-ingredient ml-2"
          />
        </div>
      );
    }

    return (
      <div
        className={`${burgerConstructor.empty} constructor-element mr-2  ${
          isHover ? `${burgerConstructor.hovered_block}` : ""
        } `}
      >
        Положите булку сюда
      </div>
    );
  };
  return (
    <div ref={dropRef} data-cy="constructor" className="ml-20 mt-25">
      {renderBun(bunData, "верх")}
      <BurgerConstructorList onDrop={onDrop} />
      {renderBun(bunData, "низ")}
      <OrderingInfo finalPrice={finalPrice} />
      {orderModal && (
        <Modal onClose={handleCloseModal} className="pt-15 pl-25 pb-30 pr-10">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
