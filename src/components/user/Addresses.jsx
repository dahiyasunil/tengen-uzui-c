import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAddressesThunk,
  removeAddressThunk,
  resetStatus,
} from "../../features/userSlice";
import toast from "react-hot-toast";

const Addresses = () => {
  const dispatch = useDispatch();
  const {
    loggedIn,
    user: { addresses },
    status,
  } = useSelector((state) => state.user);

  const checkAddressPopulated = () => {
    return typeof addresses[0] === "object";
  };

  useEffect(() => {
    if (loggedIn && addresses.length > 0 && !checkAddressPopulated()) {
      dispatch(getAddressesThunk());
    }
  }, [addresses]);

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, []);

  const removeAddressHandler = (addressObjId) => {
    if (loggedIn) {
      dispatch(removeAddressThunk(addressObjId));
    }
  };

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-8 text-grey-500 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md border-2 border-dashed p-4 md:h-72 md:w-96">
          <Link
            className="inline-block h-full w-full content-center"
            to="/user/address/add"
          >
            <div className="text-center">
              <p className="text-6xl font-medium">+</p>
              <p className="text-3xl font-medium">Add address</p>
            </div>
          </Link>
        </div>
        {addresses &&
          addresses.length > 0 &&
          checkAddressPopulated() &&
          addresses.map((address) => (
            <div
              className="grid content-between rounded-md border-2 border-dashed p-8 md:h-72 md:w-96"
              key={address._id}
            >
              <div>
                <p className="font-semibold">{address.name}</p>
                <p>{address.addressLine1}</p>
                <p>{address.addressLine2}</p>
                <p>{address.townCity}</p>
                <p>{address.state} </p>
                <p>{address.pincode}</p>
                <p>Phone: {address.mobile}</p>
              </div>
              <div>
                <Link
                  className="pr-6 text-blue-500"
                  to="/user/address/edit"
                  state={address}
                >
                  Edit
                </Link>
                {" | "}
                <button
                  className="pl-6 text-blue-500"
                  onClick={() => removeAddressHandler(address._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
      <div>
        {status === "addressRemoved" && toast.success("Address deleted!")}
        {status === "failedToRemoveAddress" &&
          toast.error("Failed to delete address. Please try again later!")}
      </div>
    </div>
  );
};

export default Addresses;
