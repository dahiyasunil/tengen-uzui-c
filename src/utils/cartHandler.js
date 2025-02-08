import { addItemToCartAction, removeFromWishlist } from "../features/userSlice";

export const addToCart = async (dispatch, loggedIn, product) => {
  if (loggedIn) {
  } else {
    dispatch(addItemToCartAction(product));
  }
};
