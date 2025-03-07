import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/userSlice";
import OrderCard from "../cards/OrderCard";

const Orders = () => {
  const dispatch = useDispatch();
  const {
    user: { orders },
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const checkOrderItemPopulated = () => {
    return typeof orders[0].items[0].item === "object";
  };

  return (
    <div className="container text-grey-500">
      <h2 className="my-8 text-2xl font-medium">All Orders</h2>
      <div>
        {orders.length > 0 && checkOrderItemPopulated() && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {orders?.map((order) => (
              <div key={order._id}>
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
