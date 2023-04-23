import { ActionType } from "../action-types";
import { Action } from "../actions";

interface OmnisortState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: OmnisortState = initialState,
  action: Action
): OmnisortState => {
  switch (action.type) {
    case ActionType.REQUEST_API:
      return { loading: true, error: null, data: [] };
    case ActionType.REQUEST_API_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.REQUEST_API_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
