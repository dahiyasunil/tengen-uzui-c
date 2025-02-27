import {
  addItemToCartAction,
  removeItemFromCartAction,
  addItemToCartThunk,
  removeItemFromCartThunk,
} from "../features/userSlice";

export const addToCart = async (dispatch, loggedIn, product, size) => {
  if (loggedIn) {
    dispatch(
      addItemToCartThunk({
        productObjId: product._id,
        quantity: 1,
        size,
      }),
    );
  } else {
    dispatch(addItemToCartAction({ product, size }));
  }
};

export const removeFromCart = async (dispatch, loggedIn, product) => {
  if (loggedIn) {
    dispatch(removeItemFromCartThunk({ productObjId: product.item._id }));
  } else {
    dispatch(removeItemFromCartAction(product));
  }
};
