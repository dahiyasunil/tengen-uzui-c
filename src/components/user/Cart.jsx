import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../features/userSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

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

  const checkCartItemsPopulated = () => {
    return typeof bag[0].item === "object";
  };

  return (
    checkCartItemsPopulated() && (
      <div className="container my-10 text-grey-500 md:my-20">
        <div className="grid md:grid-cols-12">
          <CartItems bag={bag} />
          <CartSummary bag={bag} />
        </div>
      </div>
    )
  );
};

export default Cart;
