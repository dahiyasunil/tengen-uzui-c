import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { isOnDiscount, getFinalPrice } from "../utils/getPrice";
import Modal from "./Modal";
import Login from "./Login";

const ProductCard = ({ product }) => {
  const [modal, setModal] = useState(false);

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

  const wishlistHandler = () => {
    setModal(true);
  };

  return (
    <div>
      <div className="mb-10 flex justify-center rounded p-3 transition duration-300 hover:shadow-lg hover:shadow-beige-100">
        <Link className="relative" to={`/productDetails/${product._id}`}>
          <button
            onClick={wishlistHandler}
            className="absolute right-2 top-1 rounded-full outline-none"
          >
            <HeartIcon className="m-0.5 size-8 text-beige-100/70 transition duration-200 hover:animate-pulse hover:text-beige-300" />
          </button>
          <div>
            <div>
              <img
                src={getPrimaryImage().url}
                alt={product.name}
                className="w-72 rounded-md"
              />
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
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
        ChildComponent={Login}
      ></Modal>
    </div>
  );
};

export default ProductCard;
