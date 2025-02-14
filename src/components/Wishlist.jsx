import { useDispatch, useSelector } from "react-redux";
import { getWishlistItems } from "../features/userSlice";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const wishlist = useSelector((state) => state.user.user.wishlist);

  useEffect(() => {
    if (wishlist.length > 0 && !checkWishlistPopulated()) {
      dispatch(getWishlistItems());
    }
  }, [wishlist]);

  if (status === "fetchingWishlistItems") {
    return (
      <div className="mt-12 text-center">
        <p>Getching your wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 text-center">
        <p>An error occured, please try again later!</p>
      </div>
    );
  }

  if (!wishlist || !wishlist.length > 0) {
    return (
      <div className="mt-12 text-center">
        <p>No items wishlisted.</p>
      </div>
    );
  }

  const checkWishlistPopulated = () => {
    return typeof wishlist[0] === "object";
  };

  const renderWishlist = () => {
    return (
      <div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    );
  };

  return checkWishlistPopulated() && renderWishlist();
};

export default Wishlist;
