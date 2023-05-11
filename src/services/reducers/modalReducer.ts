import {
  CLOSE_MODAL,
  OPEN_ORDER_MODAL,
  OPEN_INGREDIENTS_MODAL,
} from "../constants";
import { TAppActions } from "../actions";
import { TOrder } from "../../utils/types/types";

type TModalState = {
  ingredientsModal: boolean;
  orderModal: boolean;
  orderInfo: null | TOrder;
};

const initialState: TModalState = {
  ingredientsModal: false,
  orderModal: false,
  orderInfo: null,
};

export const modalReducer = (
  state = initialState,
  action: TAppActions
): TModalState => {
  switch (action.type) {
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
        orderModal: false,
        ingredientsModal: false,
        orderInfo: null,
      };
    default:
      return state;
  }
};
