import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/outline";

import {
  HeartIcon as HeartIconSolid,
  StarIcon,
} from "@heroicons/react/24/solid";
import ShowPrice from "./ShowPrice";
import { addToWishlist, removeFromWishlist } from "../features/userSlice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../features/productSlice";
import { addToCart } from "../utils/cartHandler";
import Modal from "./Modal";
import Login from "./Login";

const ProductCard = ({ product }) => {
  const [modal, setModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector((state) => state.user);

  const getPrimaryImage = () => {
    return product.images.find((img) => img.isPrimary);
  };

  const wishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dispatch, loggedIn, product);
  };

  const renderModal = () => {
    return (
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
        ChildComponent={Login}
      ></Modal>
    );
  };

  useEffect(() => {
    if (loggedIn && pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [loggedIn, pendingAction]);

  return (
    <div>
      <div className="mb-10 flex justify-center rounded p-3 transition duration-300 hover:shadow-lg hover:shadow-beige-100">
        <Link to={`/productDetails/${product._id}`}>
          <div>
            <div className="relative">
              <img
                src={getPrimaryImage().url}
                alt={product.name}
                className="w-72 rounded-md"
              />
              <button
                onClick={wishlistHandler}
                className="absolute right-2 top-1 rounded-full outline-none"
              >
                {product?.isWishlisted ? (
                  <HeartIconSolid className="m-0.5 size-8 text-red-500 transition duration-200 hover:animate-pulse hover:text-beige-300" />
                ) : (
                  <HeartIcon className="m-0.5 size-8 text-beige-100/90 transition duration-200 hover:animate-pulse hover:text-beige-300" />
                )}
              </button>
              {product.rating && (
                <div className="absolute bottom-0 flex w-full justify-center rounded-b bg-gradient-to-r from-beige-100/10 via-beige-500/70 to-beige-100/10 py-1">
                  <small className="text-grey-700">{product.rating} </small>
                  <StarIcon className="w-3.5 text-grey-700" />
                </div>
              )}
            </div>
            <div className="px-4 py-2 text-center">
              <p className="py-3">
                <small className="text-base font-semibold text-beige-700">
                  {product.brand}
                </small>
              </p>
              <p>
                <small>{product.title}</small>
              </p>
              <ShowPrice product={product} />
            </div>
            <div className="flex">
              <button
                className="mx-auto w-11/12 justify-center rounded-md bg-grey-300 py-1 text-white transition hover:bg-grey-500"
                onClick={addToCartHandler}
              >
                <small>Add to cart</small>
              </button>
            </div>
          </div>
        </Link>
      </div>
      {modal && renderModal()}
    </div>
  );
};

export default ProductCard;
