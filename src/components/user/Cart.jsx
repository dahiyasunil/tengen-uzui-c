import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCartItems, resetStatus } from "../../features/userSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import SelectAddress from "../SelectAddress";
import Modal from "../Modal";
import Login from "../Login";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loggedIn,
    user: { bag },
  } = useSelector((state) => state.user);
  // const { bag } = useSelector((state) => state.user.user);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressValidation, setAddressValidation] = useState("");
  const [modal, setModal] = useState(false);

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
    if (bag.length > 0 && !checkCartItemsPopulated()) {
      dispatch(getCartItems());
    }
    return () => dispatch(resetStatus());
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
            <Link
              className="ms-2 text-beige-700 duration-500 ease-in-out hover:rounded-md hover:bg-beige-500/80 hover:p-3 hover:text-white hover:underline"
              to="/wishlist"
            >
              Let's add some items.
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const checkCartItemsPopulated = () => {
    return typeof bag[0].item === "object";
  };

  const placeOrdeHandler = (e) => {
    if (loggedIn) {
      if (location.pathname == "/cart") {
        navigate("/cart/address");
      }

      if (location.pathname == "/cart/address") {
        if (selectedAddress) {
          setAddressValidation("");
          navigate("/order", { state: selectedAddress });
        } else {
          setAddressValidation("Please select atleast one address to continue");
        }
      }
    } else {
      if (location.pathname == "/cart") {
        setModal(true);
      }
    }
  };

  return (
    checkCartItemsPopulated() && (
      <div className="container my-10 text-grey-500 md:my-20">
        <div className="grid md:grid-cols-12">
          {location.pathname == "/cart" ? (
            <CartItems bag={bag} />
          ) : (
            <SelectAddress
              addressValidation={addressValidation}
              setSelectedAddress={setSelectedAddress}
            />
          )}
          <section className="col-span-6">
            <CartSummary bag={bag} />
            <button
              className="mt-8 w-4/6 rounded bg-beige-500 py-1 hover:bg-beige-700"
              onClick={placeOrdeHandler}
            >
              <span className="text-white">
                {location.pathname === "/cart/address"
                  ? "PLACE ORDER"
                  : "CONTINUE"}
              </span>
            </button>
          </section>
        </div>
        {modal && renderModal()}
      </div>
    )
  );
};

export default Cart;
