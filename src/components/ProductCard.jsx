import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const getPrimaryImage = () => {
    return product.images.find((img) => img.isPrimary);
  };

  const showPrice = () => {
    const price = product.discount?.percentage
      ? Math.round(
          product.price.amount -
            (product.price.amount * product.discount.percentage) / 100,
        )
      : product.price.amount;

    return (
      <p>
        <small>
          {product.discount?.percentage ? (
            <span className="font-semibold">
              &#8377;{price}{" "}
              <span className="text-grey-100 font-normal line-through">
                &#8377;{product.price.amount}
              </span>
              <span>
                <small className="text-beige-700 font-extralight">
                  {" "}
                  ({product.discount.percentage}% off)
                </small>
              </span>
            </span>
          ) : (
            <span className="font-semibold">&#8377;{price}</span>
          )}
        </small>
      </p>
    );
  };

  const wishlistHandler = () => {};

  return (
    <div className="hover:shadow-beige-100 mb-10 flex justify-center rounded p-3 transition duration-300 hover:shadow-lg">
      <Link className="relative">
        <button
          onClick={wishlistHandler}
          className="absolute right-2 top-1 rounded-full"
        >
          <HeartIcon className="text-beige-100/70 hover:text-beige-300 m-0.5 size-8 transition duration-200 hover:animate-pulse" />
        </button>
        <div className="grid"></div>
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
              <small className="text-beige-700 text-base font-semibold">
                {product.brand}
              </small>
            </p>
            <p>
              <small>{product.title}</small>
            </p>
            {showPrice()}
          </div>
          <div className="flex">
            <button className="bg-grey-300 hover:bg-grey-500 mx-auto w-11/12 justify-center rounded-md py-1 text-white transition">
              <small>Add to cart</small>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
