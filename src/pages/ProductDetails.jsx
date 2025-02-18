import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFinalPrice, isOnDiscount } from "../utils/getPrice";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { addToCart } from "../utils/cartHandler";
import Modal from "../components/Modal";
import Login from "../components/Login";
import { handleWishlisting } from "../utils/wishlistHandler";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id == productId),
  );

  const [modal, setModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  if (!product) {
    return (
      <div className="flex h-56 items-center justify-center">
        <p className="text-2xl text-grey-500">
          Oops..! Please try again later.
        </p>
      </div>
    );
  }

  const wishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleWishlisting(dispatch, loggedIn, setModal, setPendingAction, product);
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
    <div className="container my-8 lg:my-16">
      <div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="basis-1/2">
            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2">
              {product?.images.map((image) => (
                <img
                  src={image.url}
                  alt={image.altText}
                  key={image._id}
                  className="w-64 rounded transition duration-300 hover:scale-105 lg:w-96"
                />
              ))}
            </div>
          </div>
          <div className="basis-1/2">
            <div className="text-center text-sm text-grey-500 md:text-left lg:text-base">
              <h2 className="text-2xl text-beige-700">{product.brand}</h2>
              <p>
                <small>{product.title}</small>
              </p>
              {product.reviews.rating && (
                <p className="my-1">{product.reviews.rating}</p>
              )}
              <div>
                <p className="pt-2 text-lg font-semibold text-beige-700">
                  &#8377; {getFinalPrice(product)}
                </p>
                {isOnDiscount(product) && (
                  <p className="pt-1 text-sm">
                    <span className="line-through">
                      MRP &#8377;{product.price.amount}
                    </span>
                    <span> </span>
                    <span className="font-semibold text-beige-700">
                      ({product.discount.percentage}% off)
                    </span>
                  </p>
                )}
                <p className="pb-2">
                  <small>Price inclusive of all taxes</small>
                </p>
              </div>
              <div className="py-4">
                <p>SELECT SIZE</p>
                <div className="mt-3 space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size._id}
                      className="delay-50 rounded-full bg-beige-100 bg-opacity-40 px-3 transition duration-300 ease-in-out hover:scale-110 hover:bg-opacity-70"
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="my-4 flex flex-col items-center justify-center space-y-4 md:flex-row md:justify-start md:space-x-6 md:space-y-0">
                <button
                  className="delay-50 flex w-2/3 items-center justify-center rounded bg-beige-100 py-2 transition duration-300 ease-in-out hover:scale-105 lg:w-1/3"
                  onClick={addToCartHandler}
                >
                  <span>
                    <ShoppingBagIcon className="mr-2 w-4" />
                  </span>
                  ADD TO BAG
                </button>
                <button
                  className="delay-50 flex w-2/3 items-center justify-center rounded border-2 border-beige-100 py-2 transition duration-300 ease-in-out hover:scale-105 lg:w-1/3"
                  onClick={wishlistHandler}
                >
                  <span>
                    <HeartIcon className="mr-2 w-4" />
                  </span>
                  WISHLIST
                </button>
              </div>
              <hr />
              <div className="my-4 space-y-2">
                <p>100% Original Products</p>
                <p>Pay on delivery might be available</p>
                <p>Easy 14 days returns and exchanges</p>
              </div>
              <div className="my-6 space-y-3">
                <h2 className="text-xl font-semibold">Product Details:</h2>
                <p>{product.productDetails.description}</p>
                <p>
                  <strong>Material: </strong>
                  <br />
                  {product.material}
                </p>
                <p>
                  <strong>Style & Fit: </strong>
                  <br />
                  {product.style}, {product.productDetails.fit}
                </p>
                <p>
                  <strong>Care Instructions: </strong>
                  <br />
                  {product.productDetails.careInstructions}
                </p>
                <div>
                  <p>
                    <strong>Addition Info:</strong>
                    <br />
                    {product.productDetails.keyFeatures.map(
                      (feature, index) => (
                        <li key={index}>{feature}</li>
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <hr />
          <p className="mt-3">Similar Products</p>
        </div>
      </div>
      {modal && renderModal()}
    </div>
  );
};

export default ProductDetails;
