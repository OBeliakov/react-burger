import React, { useState, useEffect, Fragment } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import app from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const App = () => {
    const [state, setState] = useState({
        ingredientsData: [],
        loading: true,
        error: false,
    });

    const [modal, handleModal] = useState({
        ingredientsModal: false,
        orderModal: false,
    });

    const [ingredientType, setType] = useState("bun");
    const [ingredientId, setActiveIngredient] = useState("");
    const _apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    const getIngredientsData = () => {
        setState({ ...state, loading: true });
        fetch(_apiUrl)
            .then((res) => res.json())
            .then((res) => {
                const ingredientsData = res.data;
                setState({
                    ...state,
                    ingredientsData,
                    loading: false,
                });
            })
            .catch((err) => {
                setState({ ...state, error: true, loading: false });
                console.log(err.message);
            });
    };

    const onEscClick = (e) => {
        if (e.key === "Escape") {
            onHandleModal(false);
        }
    };

    const onHandleModal = (flag, type = "") => {
        if (flag) {
            if (type === "ingredients") {
                handleModal({
                    ...modal,
                    ingredientsModal: true,
                });
            } else if (type === "order") {
                handleModal({
                    ...modal,
                    orderModal: true,
                });
            }
        } else {
            handleModal({
                ingredientsModal: false,
                orderModal: false,
            });
        }
    };

    const getActiveIngredient = (ingredientId) => {
        setActiveIngredient(ingredientId);
    };

    const getActiveType = (type) => {
        setType(type);
    };

    useEffect(() => {
        getIngredientsData();

        document.addEventListener("keydown", onEscClick);

        return () => {
            document.removeEventListener("keydown", onEscClick);
        };
    }, []);

    const { ingredientsData, loading, error } = state;
    const currentIngredient = ingredientsData.find(
        (item) => item._id === ingredientId
    );

    const filteredItems = [...ingredientsData].filter(
        (item) => item.type === ingredientType
    );

    return (
        <>
            <AppHeader />
            {!error ? (
                <>
                    <main className={app.main}>
                        {ingredientsData && !loading ? (
                            <>
                                <BurgerIngredients
                                    getActiveIngredient={getActiveIngredient}
                                    data={filteredItems}
                                    openModal={onHandleModal}
                                    getActiveType={getActiveType}
                                />
                                <BurgerConstructor
                                    openModal={onHandleModal}
                                    data={ingredientsData}
                                />
                            </>
                        ) : (
                            <p>Загрузка данных...</p>
                        )}
                        {ingredientId && modal.ingredientsModal && (
                            <IngredientDetails
                                currentIngredient={currentIngredient}
                                closeModal={onHandleModal}
                            />
                        )}
                        {modal.orderModal && (
                            <OrderDetails closeModal={onHandleModal} />
                        )}
                    </main>
                </>
            ) : null}
        </>
    );
};

export default App;
