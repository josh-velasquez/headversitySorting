import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const requestApi = (sortValues: string, keywords: string[]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });

    // TODO: Move URL to constant file !!
    try {
      const { data } = await axios.post("https://localhost:7006/sorting", {
        payload: {
          sortValues: sortValues,
          keywords: keywords,
        },
      });
      const results = data.objects;

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
