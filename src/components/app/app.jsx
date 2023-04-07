import React, { useEffect } from "react";
import { getIngredients, checkUserAuth } from "../services/actions/actions";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import {
    ConstructorPage,
    SignInPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    NotFoundPage,
    OrderPage,
} from "../../pages";
import IngredientsDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import { _apiBase } from "../services/constants";
import { UnAuthorized, Authorized } from "../protected-route";

const App = () => {
    const dispatch = useDispatch();
    const _apiUrl = `${_apiBase}/ingredients`;

    useEffect(() => {
        dispatch(getIngredients(_apiUrl));
        dispatch(checkUserAuth());
    }, []);

    const location = useLocation();

    const background = location.state && location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<ConstructorPage />} />
                <Route
                    path="/login"
                    element={<UnAuthorized component={<SignInPage />} />}
                />
                <Route
                    path="/register"
                    element={<UnAuthorized component={<RegisterPage />} />}
                />
                <Route
                    path="/forgot-password"
                    element={
                        <UnAuthorized component={<ForgotPasswordPage />} />
                    }
                />
                <Route
                    path="/reset-password"
                    element={<UnAuthorized component={<ResetPasswordPage />} />}
                />
                <Route
                    path="/profile"
                    element={<Authorized component={<ProfilePage />} />}
                />
                <Route
                    path="/profile/orders"
                    element={<Authorized component={<OrderPage />} />}
                />

                <Route
                    path="/ingredients/:ingredientId"
                    element={<IngredientsDetails />}
                />
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={
                            <Modal
                                modalTitle="Детали ингредиента"
                                className="pt-10 pl-10 pb-15 pr-10"
                            >
                                <IngredientsDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default App;
