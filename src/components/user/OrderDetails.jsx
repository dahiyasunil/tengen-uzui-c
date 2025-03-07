import { Link, useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state;

  const getPrimaryImage = (item) => {
    const image = item.images.find((img) => img.isPrimary);
    return image;
  };

  const getFormattedDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(/ /g, " ");
  };

  return (
    <div className="container my-10 text-grey-500">
      <div className="grid justify-items-center">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="mb-4 w-8/12 rounded bg-grey-100/10 p-8"
          >
            <div className="w-full">
              <div className="text-center">
                <div className="flex justify-center">
                  <Link to={`/productDetails/${item.item._id}`} className="">
                    <img
                      className="w-28 rounded-md"
                      src={getPrimaryImage(item.item).url}
                      alt={item.item.description}
                    />
                  </Link>
                </div>
                <p className="mt-3 font-medium">{item.item.brand}</p>
                <p className="mt-2 text-xs">{item.item.name}</p>
                <p className="mt-2 text-xs">Size: {item.size}</p>
                <p className="mt-2 text-xs">Quantity: {item.quantity}</p>
              </div>
              <div className="mx-6 my-4 flex rounded-md bg-white/80 px-6 py-3 text-sm">
                <p className="mr-2 font-medium">Ordered On:</p>
                <p>{getFormattedDate(order.createdAt)}</p>
              </div>
              {item.discount && (
                <div className="mx-6 my-4 rounded-md bg-white/80 px-6 py-3 text-sm text-emerald-600">
                  <div className="flex justify-between">
                    <p className="font-medium">Discount:</p>
                    <p>
                      <span className="text-beige-700">&#8377; </span>
                      {Math.round((item.price * item.discount) / 100)}
                    </p>
                  </div>
                </div>
              )}
              <div className="mx-6 my-4 rounded-md bg-white/80 px-6 py-3 text-sm">
                <div className="flex justify-between">
                  <p className="font-medium">Total Item Price:</p>
                  <p>
                    <span className="text-beige-700">&#8377; </span>
                    {item.discount
                      ? item.price -
                        Math.round((item.price * item.discount) / 100)
                      : item.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4 w-8/12 rounded bg-grey-100/10 p-8">
          <div className="mx-6 my-4 rounded-md bg-white/80 px-6 py-3 text-sm">
            <div className="flex justify-between">
              <p className="font-medium">
                Total Order Price:{" "}
                {order.totalDiscount > 0 && (
                  <>
                    <br />
                    <span className="text-xs font-normal">
                      You saved &#8377;{" "}
                      <span className="text-emerald-600">
                        {order.totalDiscount}
                      </span>{" "}
                      on this order
                    </span>
                  </>
                )}
              </p>
              <p>
                <span className="text-beige-700">&#8377; </span>
                {order.totalPrice - order.totalDiscount}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 w-8/12 rounded bg-grey-100/10 p-8">
          <div className="mx-6 my-4 rounded-md bg-white/80 px-6 py-3 text-sm">
            <p className="mb-3 font-medium">Delivery Address:</p>
            <div className="flex justify-between">
              <div>
                <p>{order.deliveryAddress.name}</p>
                <p>
                  {order.deliveryAddress.addressLine1}{" "}
                  {order.deliveryAddress.addressLine2}
                </p>
                <p>
                  {order.deliveryAddress.townCity}-
                  {order.deliveryAddress.pincode}
                </p>
                <p>{order.deliveryAddress.state}</p>
              </div>
              <p>Mobile: {order.deliveryAddress.mobile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
