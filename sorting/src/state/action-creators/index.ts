import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import config from "../../config.json";

export const requestApi = (
  sortStrings: string,
  sortDirection: string,
  sortKeyword?: string,
  sortType?: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.post(`${config.serverBaseUrl}/api/sort/`, {
        sortStrings: sortStrings,
        sortDirection: sortDirection,
        sortKeyword: sortKeyword,
        sortType: sortType?.replace(" ", ""),
      });
      const status = data.sortingStatus;
      const results = data.payload;
      if (status === 0) {
        dispatch({
          type: ActionType.REQUEST_API_SUCCESS,
          payload: results,
        });
      } else {
        dispatch({
          type: ActionType.REQUEST_API_ERROR,
          payload: results,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const requestApiFileUpload = (
  file: File,
  sortDirection: string,
  sortKeyword?: string,
  sortType?: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("sortDirection", sortDirection);
      formData.append("sortKeyword", sortKeyword ?? "");
      formData.append("sortType", sortType?.replace(" ", "") ?? "");
      const { data } = await axios.post(
        `${config.serverBaseUrl}/api/sort/file`,
        formData
      );
      const status = data.sortingStatus;
      const results = data.payload;
      if (status === 0) {
        dispatch({
          type: ActionType.REQUEST_API_SUCCESS,
          payload: results,
        });
      } else {
        dispatch({
          type: ActionType.REQUEST_API_ERROR,
          payload: results,
        });
      }
    } catch (error: any) {
      dispatch({ type: ActionType.REQUEST_API_ERROR, payload: error.message });
    }
  };
};
