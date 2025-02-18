import { addToWishlist, removeFromWishlist } from "../features/userSlice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../features/productSlice";

export const handleWishlisting = (
  dispatch,
  loggedIn,
  setModal,
  setPendingAction,
  product,
) => {
  if (!loggedIn) {
    setModal(true);
    setPendingAction(() => () => {
      dispatch(addToWishlist(product._id));
      dispatch(addProductToWishlist(product._id));
    });
  } else {
    if (product.isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      dispatch(removeProductFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
      dispatch(addProductToWishlist(product._id));
    }
  }
};
