import { TFeedOrder } from "../../utils/types/types";
import { TAppActions } from "../actions";
import {
  FEED_CONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_MESSAGE,
  WS_ERROR,
  CURRENT_ORDER,
} from "../constants";

type TWsState = {
  ordersList: [] | TFeedOrder[];
  connectingError: string;
  currentOrder: null | TFeedOrder;
};

export const feedState: TWsState = {
  ordersList: [],
  connectingError: "",
  currentOrder: null,
};

export const feedReducer = (
  state = feedState,
  action: TAppActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTING:
      return {
        ...state,
      };
    case FEED_CONNECT:
      return {
        ...state,
      };
    case WS_OPEN:
      return {
        ...state,
        connectingError: "",
      };
    case WS_CLOSE:
      return {
        ...state,
      };
    case WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case WS_MESSAGE:
      return {
        ...state,
        ordersList: action.payload.orders,
      };
    case CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    default:
      return state;
  }
};
