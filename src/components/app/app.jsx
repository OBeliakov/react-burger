import React, { useEffect } from "react";
import { getIngredients } from "../services/actions/actions";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
    ConstructorPage,
    SignInPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    NotFoundPage,
} from "../../pages";
import IngredientsDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import { _apiBase } from "../services/constants";

const App = () => {
    const dispatch = useDispatch();
    const _apiUrl = `${_apiBase}/ingredients`;

    useEffect(() => {
        dispatch(getIngredients(_apiUrl));
    }, []);

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<ConstructorPage />} />
                <Route
                    path="/ingredients/:ingredientId"
                    element={<IngredientsDetails />}
                />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={
                            <Modal
                                onClose={handleModalClose}
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
