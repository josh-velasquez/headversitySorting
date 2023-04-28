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
    let jsonObject = JSON.stringify(sortStrings);
    console.warn(jsonObject.replace(/\s\s+/g, "")) // close just remove '\n'

    //\n{\nid: 0\nname: John Doe,\nage: 20,\nweight: 175 (lbs),\nheight: 188 (cm)\n},\n{\nid: 1,\nname: Jane Smith,\nage: 22,\nweight: 120 (lbs),\nheight: 155 (cm)\n}\n]"

    try {
      const { data } = await axios.post(
        `${config.serverBaseUrl}/api/sort/`,
        {
          sortStrings: JSON.stringify(sortStrings).replace("\\n", "").trim(),
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
  file: File,
  sortKeyword?: string,
  sortOrder?: string[]
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("sortKeyword", sortKeyword ?? "");
      formData.append("sortOrder", JSON.stringify(sortOrder));
      const { data } = await axios.post(
        `${config.serverBaseUrl}/api/sort/file`,
        formData
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
