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
} from "./actions";

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
        default:
            return state;
    }
};
