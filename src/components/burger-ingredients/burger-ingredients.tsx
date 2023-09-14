import React, { useEffect, useRef } from "react";
import TabList from "./tab-list/tab-list";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import burgerIngredients from "./burger-ingredients.module.css";
import { useDispatch } from "../hooks/hooks";
import { SET_CURRENT_TAB } from "../../services/constants";

type TIngredientOpts = {
  type: string;
  ref: React.RefObject<HTMLDivElement | null>;
};

const BurgerIngredients = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const tabRef = useRef<HTMLDivElement | null>(null);
  const bunOptions = { type: "bun", ref: useRef<HTMLDivElement | null>(null) };
  const sauceOptions = {
    type: "sauce",
    ref: useRef<HTMLDivElement | null>(null),
  };
  const mainOptions = {
    type: "main",
    ref: useRef<HTMLDivElement | null>(null),
  };

  const setCurrentElement = (tabPos: number, element: TIngredientOpts) => {
    const {
      ref: { current },
      type,
    } = element;

    if (!current) {
      return;
    }

    if (tabPos - current.getBoundingClientRect().top >= 0) {
      dispatch({ type: SET_CURRENT_TAB, payload: type });
    }
  };

  const findScrollableEl = (obj: TIngredientOpts, type: string) => {
    if (obj.type === type) {
      if (!obj.ref.current) {
        return;
      }

      obj.ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollByTabClick = (type: string) => {
    findScrollableEl(bunOptions, type);
    findScrollableEl(sauceOptions, type);
    findScrollableEl(mainOptions, type);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!tabRef.current) {
        return;
      }
      const tabsBottomPos = tabRef.current.getBoundingClientRect().bottom;
      setCurrentElement(tabsBottomPos, bunOptions);
      setCurrentElement(tabsBottomPos, sauceOptions);
      setCurrentElement(tabsBottomPos, mainOptions);
    };
    const listNode = listRef.current;
    if (!listNode) {
      return;
    }
    listNode.addEventListener("scroll", handleScroll);

    return () => {
      listNode.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buildListLayout = (obj: TIngredientOpts): JSX.Element => {
    const { type, ref } = obj;
    return <BurgerIngredientsList ingredientsType={type} ref={ref} />;
  };

  return (
    <div>
      <h2
        data-cy="constructor title"
        className="text text_type_main-large mt-10 mb-5"
      >
        Соберите бургер
      </h2>
      <TabList scrollByTabClick={scrollByTabClick} ref={tabRef} />
      <div
        ref={listRef}
        className={`${burgerIngredients.container} custom-scroll pt-10`}
      >
        {buildListLayout(bunOptions)}
        {buildListLayout(sauceOptions)}
        {buildListLayout(mainOptions)}
      </div>
    </div>
  );
};

export default BurgerIngredients;
