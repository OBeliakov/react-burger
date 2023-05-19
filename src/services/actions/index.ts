import { TFormActions } from "./formActions";
import { TIngredientsActions } from "./ingredientsActions";
import { TActionsModal } from "./modalActions";
import { TOrderActions } from "./orderActions";
import { TWsActions } from "./feedActions";

export type TAppActions =
  | TFormActions
  | TIngredientsActions
  | TActionsModal
  | TOrderActions
  | TWsActions;
