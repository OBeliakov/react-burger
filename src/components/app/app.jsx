import React, { useState, useEffect, Fragment } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import app from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

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
    const [currentIngredient, setActiveIngredient] = useState("");
    const _apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    const getIngredientsData = () => {
        setState({ ...state, loading: true });
        fetch(_apiUrl)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
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

    const getActiveIngredient = (item) => {
        setActiveIngredient(item);
    };

    const getActiveType = (type) => {
        setType(type);
    };

    useEffect(getIngredientsData, []);

    const { ingredientsData, loading, error } = state;

    const filteredItems = ingredientsData.filter(
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
                        {currentIngredient && modal.ingredientsModal && (
                            <Modal
                                modalTitle="Детали ингредиента"
                                closeModal={handleModal}
                                className="pt-10 pl-10 pb-15 pr-10"
                            >
                                <IngredientDetails
                                    currentIngredient={currentIngredient}
                                    closeModal={onHandleModal}
                                />
                            </Modal>
                        )}
                        {modal.orderModal && (
                            <Modal
                                className="pt-15 pl-25 pb-30 pr-10"
                                closeModal={handleModal}
                            >
                                <OrderDetails closeModal={onHandleModal} />
                            </Modal>
                        )}
                    </main>
                </>
            ) : null}
        </>
    );
};

export default App;
