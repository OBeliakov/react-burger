import { act } from "react-dom/test-utils";
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    OPEN_INGREDIENTS_MODAL,
    OPEN_ORDER_MODAL,
    CLOSE_MODAL,
    SET_ACTIVE_INGREDIENT,
    POST_ORDER_INFO_SUCCESS,
    POST_ORDER_INFO_FAILED,
    SET_CURRENT_TAB,
    ADD_BUN,
    INCREASE_INGREDIENT,
    DRAG_CONSTRUCTOR_INGREDIENTS,
    DRAG_BUN_INGREDIENT,
    SORT_INGREDIENTS_ON_DRAG,
    RESET_FORM_FAILED,
    RESET_FORM_SUCCESS,
    UPDATE_FORM_FAILED,
    UPDATE_FORM_SUCCESS,
    REGISTER_FORM_SUCCESS,
    REGISTER_FORM_FAILED,
    LOGIN_FORM_SUCCESS,
    LOGIN_FORM_FAILED,
    SET_USER_FAILED,
    SET_USER_SUCCESS,
} from "../actions/actions";

const initialState = {
    ingredientsData: [],
    loading: true,
    error: false,
    constructorIngredients: [],
    currentIngredient: {},
    order: {},
    orderFailed: false,
    ingredientsModal: false,
    orderModal: false,
    currentTab: "bun",
    bun: null,
    resetFormFailed: false,
    resetFormSuccess: false,
    updateFormFailed: false,
    updateFormSuccess: false,
    registerFormSuccess: false,
    registerFormFailed: false,
    loginFormSuccess: false,
    loginFormFailed: false,
    userInfo: {
        email: "",
        name: "",
        password: "",
    },
    userInfoFailed: false,
    userInfoSuccess: false,
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                constructorIngredients: action.payload,
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                constructorIngredients: action.payload,
            };
        case GET_INGREDIENTS:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsData: action.ingredientsData,
                loading: false,
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case OPEN_INGREDIENTS_MODAL:
            return {
                ...state,
                ingredientsModal: true,
            };
        case OPEN_ORDER_MODAL:
            return {
                ...state,
                orderModal: true,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                ingredientsModal: false,
                orderModal: false,
            };
        case SET_ACTIVE_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.currentIngredient,
            };
        case POST_ORDER_INFO_SUCCESS:
            return {
                ...state,
                order: action.order,
            };
        case POST_ORDER_INFO_FAILED:
            return {
                ...state,
                orderFailed: true,
            };
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.payload,
            };
        case ADD_BUN:
            return {
                ...state,
                bun: action.payload,
            };
        case INCREASE_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].map(
                    (item) =>
                        item._id === action.id
                            ? { ...item, qty: ++item.qty }
                            : item
                ),
            };
        }
        case DRAG_BUN_INGREDIENT: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case DRAG_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients,
                    action.item,
                ],
            };
        }
        case SORT_INGREDIENTS_ON_DRAG: {
            return {
                ...state,
                constructorIngredients: action.payload,
            };
        }
        case RESET_FORM_SUCCESS: {
            return {
                ...state,
                resetFormSuccess: true,
            };
        }
        case RESET_FORM_FAILED:
            return {
                ...state,
                resetFormFailed: true,
            };
        case UPDATE_FORM_SUCCESS: {
            return {
                ...state,
                updateFormSuccess: true,
            };
        }
        case UPDATE_FORM_FAILED:
            return {
                ...state,
                updateFormFailed: true,
            };
        case REGISTER_FORM_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                registerFormSuccess: true,
            };
        case REGISTER_FORM_FAILED:
            return {
                ...state,
                registerFormFailed: true,
            };
        case LOGIN_FORM_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                loginFormSuccess: true,
            };
        case LOGIN_FORM_FAILED:
            return {
                ...state,
                loginFormFailed: true,
            };
        case SET_USER_FAILED: {
            return {
                ...state,
                userInfoFailed: true,
            };
        }
        case SET_USER_SUCCESS: {
            return {
                ...state,
                userInfoSucces: true,
                userInfo: action.payload,
            };
        }
        default:
            return state;
    }
};
