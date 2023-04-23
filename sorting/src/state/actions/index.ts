import { ActionType } from "../action-types";

interface RequestApiAction {
  type: ActionType.REQUEST_API;
}

interface RequestApiSuccessAction {
  type: ActionType.REQUEST_API_SUCCESS;
  payload: string[];
}

interface RequstApiErrorAction {
  type: ActionType.REQUEST_API_ERROR;
  payload: string;
}

export type Action =
  | RequestApiAction
  | RequestApiSuccessAction
  | RequstApiErrorAction;
