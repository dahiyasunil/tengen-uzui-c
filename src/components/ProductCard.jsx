import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { isOnDiscount, getFinalPrice } from "../utils/getPrice";
import { addToWishlist } from "../features/userSlice";
import Modal from "./Modal";
import Login from "./Login";

const ProductCard = ({ product }) => {
  const [modal, setModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector((state) => state.user);

  const getPrimaryImage = () => {
    return product.images.find((img) => img.isPrimary);
  };

  const showPrice = () => {
    return (
      <p>
        <small>
          {isOnDiscount(product) ? (
            <span className="font-semibold">
              &#8377;{getFinalPrice(product)}{" "}
              <span className="font-normal text-grey-100 line-through">
                &#8377;{product.price.amount}
              </span>
              <span>
                <small className="font-extralight text-beige-700">
                  {" "}
                  ({product.discount.percentage}% off)
                </small>
              </span>
            </span>
          ) : (
            <span className="font-semibold">&#8377;{product.price.amount}</span>
          )}
        </small>
      </p>
    );
  };

  const wishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loggedIn) {
      setPendingAction(() => () => {
        dispatch(addToWishlist(product._id));
      });
      setModal(true);
    } else {
      dispatch(addToWishlist(product._id));
    }
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
      console.log(`Executing pending actions..`);

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
                <HeartIcon className="m-0.5 size-8 text-beige-100/70 transition duration-200 hover:animate-pulse hover:text-beige-300" />
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
              {showPrice()}
            </div>
            <div className="flex">
              <button className="mx-auto w-11/12 justify-center rounded-md bg-grey-300 py-1 text-white transition hover:bg-grey-500">
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
