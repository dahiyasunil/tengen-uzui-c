import {
  addItemToCartAction,
  removeFromWishlist,
  addItemToCartThunk,
} from "../features/userSlice";

export const addToCart = async (dispatch, loggedIn, product) => {
  if (loggedIn) {
    dispatch(addItemToCartThunk({ productObjId: product._id, quantity: 1 }));
  } else {
    dispatch(addItemToCartAction(product));
  }
};
