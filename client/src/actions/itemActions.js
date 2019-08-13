import { GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

export const getItems = () => dispatch => {
  dispatch(setItemsLoaidng());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEM,
      payload: res.data
    })
  );
};

export const deleteItems = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const addItems = item => dispatch => {
  axios.post("/api/items", item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

export const setItemsLoaidng = () => {
  return {
    type: ITEMS_LOADING
  };
};
