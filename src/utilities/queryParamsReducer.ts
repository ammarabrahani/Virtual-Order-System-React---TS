export const initialQueryParams = {
  page: 1,
  perPage: 10,
  orderByColumn: "created_at",
  orderBy: "desc",
};

export const RESET_PARAM = "RESET_PARAM";
export const UPDATE_PARAM = "UPDATE_PARAM";

export const queryParamsReducer = (state: any, action: any) => {
  if (action.type === UPDATE_PARAM) {
    return { ...state, ...action.payload };
  } else if (action.type === RESET_PARAM) {
    return initialQueryParams;
  }
  return state;
};
 