import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddressesThunk } from "../features/userSlice";

const SelectAddress = ({ addressValidation, setSelectedAddress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loggedIn,
    user: { addresses },
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedIn && addresses.length > 0 && !checkAddressPopulated()) {
      dispatch(getAddressesThunk());
    }
  }, []);

  const checkAddressPopulated = () => {
    return typeof addresses[0] === "object";
  };

  const addressHandler = (address) => {
    setSelectedAddress(address);
  };

  return (
    <section className="col-span-6 mr-20">
      <div className="flex justify-between">
        <p className="text-xl font-medium">Select Delivery Address</p>
        <button
          className="rounded bg-beige-500 px-4 py-1 text-white hover:bg-beige-700"
          onClick={() => navigate("/user/address/add")}
        >
          Add New Address
        </button>
      </div>
      {addressValidation && (
        <p className="my-2 text-red-500">{addressValidation}</p>
      )}
      {addresses && addresses.length > 0 && checkAddressPopulated() ? (
        <div>
          {addresses.map((address, i) => (
            <div key={address._id} className="my-5 rounded-md border p-5">
              <label htmlFor={i} className="flex items-start">
                <input
                  type="radio"
                  name="deliveryAddress"
                  id={i}
                  className="mt-1.5"
                  onChange={() => addressHandler(address)}
                />
                <span className="px-4">
                  <span className="font-medium">{address.name}</span>
                  <br />
                  <span>{address.addressLine1}</span>
                  {", "}
                  <span>{address.addressLine1}</span>
                  <br />
                  <span>
                    {address.townCity}, {address.state} - {address.pincode}
                  </span>
                  <br />
                  <span>
                    Mobile: <span>{address.mobile}</span>{" "}
                  </span>
                </span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-red-500">Please add a address for delivery</p>
      )}
    </section>
  );
};

export default SelectAddress;
