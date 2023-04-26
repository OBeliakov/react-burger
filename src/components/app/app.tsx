import React, { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredientsActions";
import { checkUserAuth } from "../../services/actions/formActions";
import { useDispatch, useSelector } from "react-redux";
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
import AppHeader from "../app-header/app-header";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { API_BASE } from "../../services/constants";
import { UnAuthorized, Authorized } from "../protected-route";
import { SET_ACTIVE_INGREDIENT } from "../../services/actions/ingredientsActions";
import { CLOSE_MODAL } from "../../services/actions/modalActions";

const App = () => {
  const dispatch = useDispatch();
  const _apiUrl = `${API_BASE}/ingredients`;
  const ingredientsModal = useSelector(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (store) => store.modalReducer.ingredientsModal
  );

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: {} });
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients(_apiUrl));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(checkUserAuth());
  }, []);

  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
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
          element={<UnAuthorized component={<ForgotPasswordPage />} />}
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
              ingredientsModal && (
                <Modal
                  onClose={handleCloseModal}
                  modalTitle="Детали ингредиента"
                  className="pt-10 pl-10 pb-15 pr-10"
                >
                  <IngredientsDetails />
                </Modal>
              )
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
