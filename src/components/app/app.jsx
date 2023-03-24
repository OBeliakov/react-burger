import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import app from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {
    getIngredients,
    DRAG_CONSTRUCTOR_INGREDIENTS,
    DRAG_BUN_INGREDIENT,
    INCREASE_INGREDIENT,
} from "../services/actions";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
    const { ingredientsData, loading, error } = useSelector((store) => store);
    const dispatch = useDispatch();
    const _apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    useEffect(() => {
        dispatch(getIngredients(_apiUrl));
    }, []);

    const onDropHandler = (item) => {
        if (item.type !== "bun") {
            dispatch({ type: DRAG_CONSTRUCTOR_INGREDIENTS, item });
            dispatch({
                type: INCREASE_INGREDIENT,
                id: item._id,
            });
        } else {
            dispatch({ type: DRAG_BUN_INGREDIENT, item });
        }
    };

    return (
        <>
            <AppHeader />
            {!error ? (
                <>
                    <main className={app.main}>
                        {ingredientsData && !loading ? (
                            <>
                                <DndProvider backend={HTML5Backend}>
                                    <BurgerIngredients />
                                    <BurgerConstructor onDrop={onDropHandler} />
                                </DndProvider>
                            </>
                        ) : (
                            <p>Загрузка данных...</p>
                        )}
                    </main>
                </>
            ) : null}
        </>
    );
};

export default App;
