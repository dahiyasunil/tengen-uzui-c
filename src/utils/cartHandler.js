import {
  addItemToCartAction,
  removeItemFromCartAction,
  addItemToCartThunk,
  removeItemFromCartThunk,
} from "../features/userSlice";

export const addToCart = async (dispatch, loggedIn, product) => {
  if (loggedIn) {
    dispatch(addItemToCartThunk({ productObjId: product._id, quantity: 1 }));
  } else {
    dispatch(addItemToCartAction(product));
  }
};

export const removeFromCart = async (dispatch, loggedIn, product) => {
  if (loggedIn) {
    dispatch(removeItemFromCartThunk({ productObjId: product._id }));
  } else {
    dispatch(removeItemFromCartAction(product));
  }
};
