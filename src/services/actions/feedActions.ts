import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_MESSAGE,
  WS_ERROR,
  CURRENT_ORDER,
  FEED_ORDER_CONNECT,
  FEED_ORDER_DISCONNECT,
} from "../constants";

import { TFeed, TFeedOrder } from "../../utils/types/types";

type TConnectAction = {
  readonly type: typeof FEED_CONNECT;
  payload: string;
};

type TDisconnectAction = {
  readonly type: typeof FEED_DISCONNECT;
  payload: string;
};

type TConnectOrderAction = {
  readonly type: typeof FEED_ORDER_CONNECT;
  payload: string;
};

type TDisconnectOrderAction = {
  readonly type: typeof FEED_ORDER_DISCONNECT;
  payload: string;
};

type TWsConnectingAction = {
  readonly type: typeof WS_CONNECTING;
};

type TWsOpen = {
  readonly type: typeof WS_OPEN;
};

type TWsClose = {
  readonly type: typeof WS_CLOSE;
};

type TWsMessage = {
  readonly type: typeof WS_MESSAGE;
  payload: TFeed;
};

type TWsError = {
  readonly type: typeof WS_ERROR;
  payload: string;
};

type TWsOrder = {
  readonly type: typeof CURRENT_ORDER;
  payload: TFeedOrder;
};

export type TWsActions =
  | TConnectAction
  | TDisconnectAction
  | TWsConnectingAction
  | TWsOpen
  | TWsClose
  | TWsMessage
  | TWsError
  | TWsOrder
  | TConnectOrderAction
  | TDisconnectOrderAction;
