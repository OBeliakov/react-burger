import { TFeedOrder } from "../../utils/types/types";
import { TAppActions } from "../actions";
import {
  FEED_CONNECT,
  FEED_CONNECTING,
  FEED_OPEN,
  FEED_CLOSE,
  FEED_MESSAGE,
  FEED_ERROR,
  FEED_CURRENT_ORDER,
} from "../constants";

type TWsState = {
  ordersList: [] | TFeedOrder[];
  connectingError: string;
  currentOrder: null | TFeedOrder;
  total: number | null;
  totalToday: number | null;
};

export const feedState: TWsState = {
  ordersList: [],
  connectingError: "",
  currentOrder: null,
  total: null,
  totalToday: null,
};

export const feedReducer = (
  state = feedState,
  action: TAppActions
): TWsState => {
  switch (action.type) {
    case FEED_CONNECTING:
      return {
        ...state,
      };
    case FEED_CONNECT:
      return {
        ...state,
      };
    case FEED_OPEN:
      return {
        ...state,
        connectingError: "",
      };
    case FEED_CLOSE:
      return {
        ...state,
      };
    case FEED_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case FEED_MESSAGE:
      return {
        ...state,
        ordersList: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case FEED_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    default:
      return state;
  }
};
