import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import app from "./app.module.css";
import data from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
    return (
        <>
            <AppHeader />
            <main className={app.main}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
            </main>
        </>
    );
};

export default App;
