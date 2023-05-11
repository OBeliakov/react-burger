import { TOrder } from "../../utils/types/types";
import { TAppActions } from "../actions";
import { POST_ORDER_INFO_SUCCESS, POST_ORDER_INFO_FAILED } from "../constants";

type TOrderState = {
  order: TOrder | null;
  orderFailed: boolean;
};

export const orderState: TOrderState = {
  order: null,
  orderFailed: false,
};

export const orderReducer = (
  state = orderState,
  action: TAppActions
): TOrderState => {
  switch (action.type) {
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
    default:
      return state;
  }
};
