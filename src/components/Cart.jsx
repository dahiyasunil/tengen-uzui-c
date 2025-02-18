import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinalPrice } from "../utils/getPrice";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { getCartItems } from "../features/userSlice";
import BagCard from "./BagCard";

const Cart = () => {
  const dispatch = useDispatch();
  const { bag } = useSelector((state) => state.user.user);

  useEffect(() => {
    if (bag.length > 0 && !checkCartItemsPopulated()) {
      dispatch(getCartItems());
    }
  }, [bag]);

  if (bag.length === 0) {
    return (
      <div className="">
        <div className="m-36 flex flex-col text-center">
          <div>
            <ShoppingBagIcon className="size-20 origin-bottom -rotate-12 justify-self-center text-beige-100 transition duration-200 hover:text-beige-500" />
          </div>
          <p className="mt-6">
            There is nothing in your bag.
            <span className="text-beige-700"> Let's add some items.</span>
          </p>
        </div>
      </div>
    );
  }

  const totalMRP = () => {
    return bag.reduce((acc, curr) => {
      acc += curr.item.price.amount * curr.quantity;
      return acc;
    }, 0);
  };

  const totalDiscount = () => {
    return bag.reduce((acc, curr) => {
      const discount =
        (curr.item.price.amount - getFinalPrice(curr.item)) * curr.quantity;
      acc += discount;
      return acc;
    }, 0);
  };

  const checkCartItemsPopulated = () => {
    return typeof bag[0].item === "object";
  };

  return (
    checkCartItemsPopulated() && (
      <div className="container my-10 text-grey-500 md:my-20">
        <div className="grid md:grid-cols-12">
          <section className="col-span-6 mr-20">
            {bag.map((item) => (
              <div
                key={item.item._id}
                className="bottom-2 mb-4 w-5/6 justify-self-end border"
              >
                <BagCard item={item} />
              </div>
            ))}
          </section>
          <section className="col-span-6">
            <div className="w-4/6">
              <p className="mb-1">
                Price Details <small>({bag.length} Item)</small>
              </p>
              <hr />
              <p className="my-2 flex justify-between">
                <span>Total MRP</span>
                <span className="text-sm font-light">&#8377;{totalMRP()}</span>
              </p>
              <p className="my-2 flex justify-between">
                <span>Discount on MRP</span>
                <span className="text-sm font-light text-green-600">
                  {totalDiscount() > 0 ? "- " : ""}&#8377;{totalDiscount()}
                </span>
              </p>
              <p className="my-2 flex justify-between">
                <span>Shipping fee</span>
                <span className="text-sm font-light text-green-600">FREE</span>
              </p>
              <hr />
              <p className="my-2 flex justify-between">
                <span>Total Amount</span>
                <span className="">&#8377;{totalMRP() - totalDiscount()}</span>
              </p>
              <hr />
              <button className="mt-8 w-full rounded bg-beige-500 py-1 hover:bg-beige-700">
                <span className="text-white">PLACE ORDER</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  );
};

export default Cart;
