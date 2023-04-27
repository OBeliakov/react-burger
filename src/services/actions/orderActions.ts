import { TConstructorIngredient } from "../../utils/types/types";
import { submitOrderRequest } from "../api";
import { CLEAR_CONSTRUCTOR } from "./ingredientsActions";
export const POST_ORDER_INFO_SUCCESS = "POST_ORDER_INFO_SUCCESS";
export const POST_ORDER_INFO_FAILED = "POST_ORDER_INFO_FAILED";

export function submitOrder(
  _orderUrl: string,
  idArray: TConstructorIngredient[]
) {
  return function (dispatch: any) {
    submitOrderRequest(_orderUrl, idArray)
      .then((data) => {
        dispatch({ type: POST_ORDER_INFO_SUCCESS, order: data.order });
        dispatch({ type: CLEAR_CONSTRUCTOR });
      })
      .catch(() => {
        dispatch({ type: POST_ORDER_INFO_FAILED });
      });
  };
}
