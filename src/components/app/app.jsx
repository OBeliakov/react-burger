import React, { useState, useEffect, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import app from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {
    IngredientsDataContext,
    ConstructorDataContext,
} from "../services/appContext";

const initialState = {
    ingredients: [],
};

const App = () => {
    const [state, setState] = useState({
        ingredientsData: [],
        loading: true,
        error: false,
    });

    const reducer = (state, action) => {
        if (action.type === "ADD") {
            return {
                ingredients: action.payload,
            };
        }

        if (action.type === "REMOVE") {
            return {
                ingredients: action.payload,
            };
        }
    };

    const [modal, handleModal] = useState({
        ingredientsModal: false,
        orderModal: false,
    });

    const [burgerConstructorState, updateBurgerConstructorState] = useReducer(
        reducer,
        initialState
    );

    const [currentIngredient, setActiveIngredient] = useState({});
    const [orderData, setOrderData] = useState({});

    const getResponse = (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
    };

    const submitOrder = (baseUrl, idArray) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: idArray,
            }),
        })
            .then((res) => {
                return getResponse(res);
            })
            .then((data) => {
                setOrderData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const _apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    const getIngredientsData = () => {
        setState({ ...state, loading: true });
        fetch(_apiUrl)
            .then((res) => {
                return getResponse(res);
            })
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

    useEffect(getIngredientsData, []);

    const { ingredientsData, loading, error } = state;
    const { order } = orderData;

    return (
        <>
            <AppHeader />
            {!error ? (
                <>
                    <main className={app.main}>
                        {ingredientsData && !loading ? (
                            <>
                                <IngredientsDataContext.Provider
                                    value={{
                                        ingredientsData,
                                        onHandleModal,
                                        setActiveIngredient,
                                    }}
                                >
                                    <ConstructorDataContext.Provider
                                        value={{
                                            burgerConstructorState,
                                            updateBurgerConstructorState,
                                            submitOrder,
                                        }}
                                    >
                                        <BurgerIngredients />
                                        <BurgerConstructor />
                                    </ConstructorDataContext.Provider>
                                </IngredientsDataContext.Provider>
                            </>
                        ) : (
                            <p>Загрузка данных...</p>
                        )}
                        {modal.ingredientsModal && (
                            <Modal
                                modalTitle="Детали ингредиента"
                                closeModal={handleModal}
                                className="pt-10 pl-10 pb-15 pr-10"
                            >
                                <IngredientDetails
                                    currentIngredient={currentIngredient}
                                />
                            </Modal>
                        )}
                        {modal.orderModal && order && (
                            <Modal
                                className="pt-15 pl-25 pb-30 pr-10"
                                closeModal={handleModal}
                            >
                                <OrderDetails orderNumber={order.number} />
                            </Modal>
                        )}
                    </main>
                </>
            ) : null}
        </>
    );
};

export default App;
