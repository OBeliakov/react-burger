import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./socketMiddleware";

import {
  FEED_CONNECT,
  FEED_ORDER_CONNECT,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE,
  WS_OPEN,
} from "./constants";
import { TWSStoreActions } from "../utils/types/types";

const wsActions: TWSStoreActions = {
  wsInit: FEED_CONNECT,
  wsInitOrder: FEED_ORDER_CONNECT,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE,
};

export type RootState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
  );

  return store;
};
