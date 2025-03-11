import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCartThunk, placeOrder, resetStatus } from "../features/userSlice";
import { fetchProducts } from "../features/productSlice";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    status,
    user: { orders },
  } = useSelector((state) => state.user);
  const deliveryAddress = location.state;

  useEffect(() => {
    dispatch(placeOrder(deliveryAddress));
  }, []);

  const continueShoppingHandler = () => {
    dispatch(clearCartThunk());
    dispatch(fetchProducts());
    navigate("/products");
    dispatch(resetStatus());
  };

  return (
    <div className="container grid h-72 content-center justify-items-center">
      {status === "placingOrder" && (
        <p className="text-center text-2xl font-medium text-yellow-500">
          Processing order ...
          <br />
          Please wait while we confirm your order!
        </p>
      )}
      {status === "orderPlacedSuccessfully" && (
        <div className="text-center">
          <p className="text-2xl font-medium text-emerald-500">
            Order placed Successfully!
          </p>
          <button
            onClick={continueShoppingHandler}
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent bg-beige-500 px-8 py-3 text-center font-medium text-white hover:bg-beige-700"
          >
            Continue Shopping
          </button>
        </div>
      )}
      {status === "failedToplaceOrder" && (
        <p className="text-2xl font-medium text-red-500">
          Failed to place order! Please contact customer support!
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
