import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import app from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../services/actions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const { ingredientsData, loading, error } = useSelector((store) => store);
    const dispatch = useDispatch();
    const _apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    useEffect(() => {
        dispatch(getIngredients(_apiUrl));
    }, []);

    return (
        <>
            <AppHeader />
            {!error ? (
                <>
                    <main className={app.main}>
                        {ingredientsData && !loading ? (
                            <>
                                <BurgerIngredients />
                                <BurgerConstructor />
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
