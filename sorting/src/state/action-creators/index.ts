import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import config from "../../config.json";

export const requestApi = (
  sortStrings: string,
  sortKeyword?: string,
  sortOrder?: string[]
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });

    try {
      const { data } = await axios.post(
        `${config.serverBaseUrl}/api/omnisort/`,
        {
          sortStrings: sortStrings,
          sortKeyword: sortKeyword,
          sortOrder: sortOrder,
        }
      );
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

export const requestApiFileUpload = (
  formFile: FormData,
  sortKeyword?: string,
  sortOrder?: string[]
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.post(
        `${config.serverBaseUrl}/api/omnisort/file`,
        {
          formFile: formFile,
          sortKeyword: sortKeyword,
          sortOrder: sortOrder,
        }
      );
      const results = data.payload;
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: results,
      });
    } catch (error: any) {
      dispatch({ type: ActionType.REQUEST_API_ERROR, payload: error.message });
    }
  };
};
