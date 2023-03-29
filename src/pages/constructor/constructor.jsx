import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import {
    SET_ACTIVE_INGREDIENT,
    DRAG_CONSTRUCTOR_INGREDIENTS,
    INCREASE_INGREDIENT,
    DRAG_BUN_INGREDIENT,
} from "../../components/services/actions/actions";
import { v4 as uuid } from "uuid";
import styles from "./constructor.module.css";
import AppHeader from "../../components/app-header/app-header";

const ConstructorPage = () => {
    const dispatch = useDispatch();
    const ingredientsData = useSelector((store) => store.ingredientsData);
    const loading = useSelector((store) => store.loading);
    const error = useSelector((store) => store.error);

    const onDropHandler = (item) => {
        dispatch({
            type: SET_ACTIVE_INGREDIENT,
            currentIngredient: item,
        });
        if (item.type !== "bun") {
            dispatch({
                type: DRAG_CONSTRUCTOR_INGREDIENTS,
                item: { ...item, key: uuid() },
            });
            dispatch({
                type: INCREASE_INGREDIENT,
                id: item._id,
            });
        } else {
            dispatch({
                type: DRAG_BUN_INGREDIENT,
                payload: { ...item, qty: ++item.qty },
            });
        }
    };

    return (
        <>
            {!error ? (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        {ingredientsData && !loading ? (
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor onDrop={onDropHandler} />
                            </DndProvider>
                        ) : (
                            <p>Загрузка данных...</p>
                        )}
                    </main>
                </>
            ) : null}
        </>
    );
};

export { ConstructorPage };
