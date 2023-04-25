import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const requestApi = (
  sortStrings: string,
  sortKeyword?: string,
  sortOrder?: string[],
  file?: File
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });

    // TODO: Move URL to constant file !!
    try {
      const { data } = await axios.post("https://localhost:7006/api/omnisort", {
        sortStrings: sortStrings,
        sortKeyword: sortKeyword,
        sortOrder: sortOrder,
        file: file
      });
      const results = data.payload;
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: results,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};
