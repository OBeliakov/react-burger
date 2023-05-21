import type { Middleware } from "redux";
import { TWsActions } from "./actions/feedActions";
import { RootState } from "./store";
import {
  TFeedStoreActions,
  TFeedOrderStoreActions,
} from "../utils/types/types";

export const socketMiddleware = (
  wsActions: TFeedStoreActions | TFeedOrderStoreActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { onInit, onClose, onOpen, onError, onMessage, onDisconnect } =
        wsActions;

      if (type === onInit) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === onDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
