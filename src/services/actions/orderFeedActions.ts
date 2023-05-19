import {
  FEED_ORDER_OPEN,
  FEED_ORDER_CLOSE,
  FEED_ORDER_ERROR,
  FEED_ORDER_CURRENT_ORDER,
  FEED_ORDER_MESSAGE,
  FEED_ORDER_CONNECTING,
  FEED_ORDER_CONNECT,
  FEED_ORDER_DISCONNECT,
} from "../constants";

import { TFeed, TFeedOrder } from "../../utils/types/types";

type TWsConnectOrderAction = {
  readonly type: typeof FEED_ORDER_CONNECT;
  payload: string;
};

type TWsDisconnectOrderAction = {
  readonly type: typeof FEED_ORDER_DISCONNECT;
  payload: string;
};

type TWsConnectingOrderAction = {
  readonly type: typeof FEED_ORDER_CONNECTING;
};

type TWsOrderOpen = {
  readonly type: typeof FEED_ORDER_OPEN;
};

type TWsOrderClose = {
  readonly type: typeof FEED_ORDER_CLOSE;
};

type TWsOrderMessage = {
  readonly type: typeof FEED_ORDER_MESSAGE;
  payload: TFeed;
};

type TWsOrderError = {
  readonly type: typeof FEED_ORDER_ERROR;
  payload: string;
};

type TWsCurrentOrder = {
  readonly type: typeof FEED_ORDER_CURRENT_ORDER;
  payload: TFeedOrder;
};

export type TWsOrderActions =
  | TWsConnectingOrderAction
  | TWsOrderOpen
  | TWsOrderClose
  | TWsOrderMessage
  | TWsOrderError
  | TWsConnectOrderAction
  | TWsDisconnectOrderAction
  | TWsCurrentOrder;
