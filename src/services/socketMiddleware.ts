import type { Middleware } from "redux";
import { TWsActions } from "./actions/feedActions";
import { RootState } from "./store";
import {
  WS_CONNECTING,
  FEED_CONNECT,
  FEED_DISCONNECT,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE,
  WS_OPEN,
} from "./constants";
import { TWSStoreActions } from "../utils/types/types";

export const socketMiddleware = (
  wsActions: TWSStoreActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === FEED_CONNECT) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
        console.log(socket);
        dispatch({ type: WS_CONNECTING });
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: WS_OPEN, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WS_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          console.log("mesasge");
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: WS_MESSAGE, payload: parsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: WS_CLOSE, payload: event });
        };

        if (type === FEED_DISCONNECT) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
