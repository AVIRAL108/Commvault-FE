import { CRUD_ERROR } from "../constants/keys";

export const requestHandler = (args) => async (dispatch) => {
  const { name, type, payload, url, method, config, params, id } = args;
  function onSuccess(success) {
    dispatch({
      name,
      type,
      payload: {
        list: success?.data,
        rowsCount: success?.headers["x-total-count"],
      },
    });
    return success;
  }
  function onError(error) {
    dispatch({ type: CRUD_ERROR, payload: error.response.data });
    return error;
  }
  try {
    const fullUrl = id ? `${url}/${id}` : url;
    const success = await config({
      url: fullUrl,
      method,
      data: payload,
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return onSuccess(success);
  } catch (error) {
    return onError(error);
  }
};
