import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCartThunk, placeOrder, resetStatus } from "../features/userSlice";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    status,
    user: { orders },
  } = useSelector((state) => state.user);
  const deliveryAddress = location.state;
  console.log(status);
  console.log(orders);

  useEffect(() => {
    dispatch(placeOrder(deliveryAddress));
  }, []);

  useEffect(() => {
    if (status === "orderPlacedSuccessfully") {
      setTimeout(() => {
        dispatch(clearCartThunk());
        navigate("/user/orders");
        dispatch(resetStatus());
      }, 3000);
    }
  }, [status]);

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
        <p className="text-2xl font-medium text-emerald-500">
          Order placed Successfully!
        </p>
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
