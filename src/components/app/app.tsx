import React, { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredientsActions";
import { checkUserAuth } from "../../services/actions/formActions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  ConstructorPage,
  SignInPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  OrderPage,
  FeedPage,
  OrderCardPage,
} from "../../pages";
import AppHeader from "../app-header/app-header";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { API_BASE } from "../../services/constants";
import { UnAuthorized, Authorized } from "../protected-route";
import { SET_ACTIVE_INGREDIENT, CLOSE_MODAL } from "../../services/constants";
import { useDispatch, useSelector } from "../hooks/hooks";
import { BurgerCardExpanded } from "../burger-order-list/burger-order-expanded/burger-order-expanded";

const App = () => {
  const dispatch = useDispatch();
  const _apiUrl = `${API_BASE}/ingredients`;
  const ingredientsModal = useSelector(
    (store) => store.modalReducer.ingredientsModal
  );

  const cardModal = useSelector((store) => store.modalReducer.cardModal);
  const cardOrderModal = useSelector(
    (store) => store.modalReducer.cardOrderModal
  );
  const currentFeedOrder = useSelector(
    (store) => store.feedReducer.currentOrder
  );
  const currentOrder = useSelector(
    (store) => store.feedOrderReducer.currentOrder
  );

  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: null });
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients(_apiUrl));
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
          path="/profile/orders/:id"
          element={<Authorized component={<OrderCardPage />} />}
        />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientsDetails />}
        />
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/feed/:id" element={<OrderCardPage />}></Route>
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
          <Route
            path="/feed/:id"
            element={
              cardModal && (
                <Modal
                  onClose={handleCloseModal}
                  className="pt-10 pl-10 pb-15 pr-10"
                >
                  <BurgerCardExpanded order={currentFeedOrder} />
                </Modal>
              )
            }
          ></Route>
          <Route
            path="/profile/orders/:id"
            element={
              cardOrderModal && (
                <Modal
                  onClose={handleCloseModal}
                  className="pt-10 pl-10 pb-15 pr-10"
                >
                  <Authorized
                    component={<BurgerCardExpanded order={currentOrder} />}
                  />
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
