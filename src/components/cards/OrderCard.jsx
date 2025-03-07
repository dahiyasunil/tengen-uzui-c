import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const getPrimaryImage = (item) => {
    const image = item.images.find((img) => img.isPrimary);
    return image;
  };

  const getFormattedDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "-");
  };

  return (
    <Link to="/user/orders/details" state={order}>
      <div className="flex justify-between rounded bg-grey-100/10 p-8">
        <div>
          <div className="mb-4 text-xs">
            <p>
              <span className="font-bold">Ordered on:</span>
              <span> {getFormattedDate(order.createdAt)}</span>
            </p>
          </div>
          <div className="flex gap-4">
            {order.items.slice(0, 2).map((item) => (
              <div className="h-24 w-20" key={getPrimaryImage(item.item)._id}>
                <img
                  className="rounded"
                  src={getPrimaryImage(item.item).url}
                  alt={item.item.description}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-xs">
          <p className="pb-3 font-bold">Delivery Address:</p>
          <p>
            <span>{order.deliveryAddress.name}</span>
          </p>
          <p>Mobile: {order.deliveryAddress.mobile}</p>
          <p>{order.deliveryAddress.addressLine1}</p>
          <p>{order.deliveryAddress.addressLine2}</p>
          <p>
            {order.deliveryAddress.townCity}-{order.deliveryAddress.pincode}
          </p>
          <p>{order.deliveryAddress.state}</p>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
