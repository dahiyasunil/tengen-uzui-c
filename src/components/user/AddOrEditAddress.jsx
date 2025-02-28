import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  addAddressThunk,
  editAddressThunk,
  resetStatus,
} from "../../features/userSlice";
import toast from "react-hot-toast";

const AddOrEditAddress = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const dispatch = useDispatch();
  const addressData = useLocation().state;
  const { status } = useSelector((state) => state.user);

  const [mobileValidaitionMsg, setMobileValidationMsg] = useState("");
  const [pincodeValidationMsg, setPincodeValidationMsg] = useState("");

  const addressState = {
    name: "",
    mobile: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    townCity: "",
    state: "",
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [address, setAddress] = useState(addressData ?? addressState);

  const fieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const addressHandler = (e) => {
    e.preventDefault();
    if (
      Number(address.mobile) &&
      String(address.mobile).length === 10 &&
      Number(address.pincode) &&
      String(address.pincode).length === 6
    ) {
      if (action.toLowerCase() === "edit" && addressData._id) {
        dispatch(editAddressThunk({ addressObjId: addressData._id, address }));
      } else {
        dispatch(addAddressThunk(address));
      }
      setMobileValidationMsg("");
      setPincodeValidationMsg("");
    }
    if (!Number(address.mobile) || String(address.mobile).length !== 10) {
      setMobileValidationMsg("Please enter valid 10 digit mobile number!");
    }
    if (!Number(address.pincode) || String(address.pincode).length !== 6) {
      setPincodeValidationMsg("Please enter valid 6 digit pincode number!");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, []);

  return (
    <div className="container w-6/12 py-10 text-grey-500">
      <h2 className="text-3xl">
        {action === "add" ? "Add a new address" : "Edit address"}
      </h2>
      <form onSubmit={addressHandler}>
        <div className="my-2">
          <label htmlFor="name">Full Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={address.name}
            className="mt-1 w-full rounded-md border-2 p-1.5"
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <div className="my-2">
          <label htmlFor="mobile">Mobile number</label>
          <br />
          <input
            type="text"
            maxLength="10"
            minLength="10"
            name="mobile"
            id="mobile"
            value={address.mobile}
            className="mt-1 w-full rounded-md border-2 p-1.5"
            onChange={fieldChangeHandler}
            required
          />
          {mobileValidaitionMsg && (
            <p className="text-red-500">{mobileValidaitionMsg}</p>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="pincode">Pincode</label>
          <br />
          <input
            type="text"
            minLength="6"
            maxLength="6"
            name="pincode"
            id="pincode"
            value={address.pincode}
            className="mt-1 w-full rounded-md border-2 p-1.5"
            onChange={fieldChangeHandler}
            required
          />
          {pincodeValidationMsg && (
            <p className="text-red-500">{pincodeValidationMsg}</p>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="addressLine1">
            Flat, House no., Building, Company, Apartment
          </label>
          <br />
          <input
            type="text"
            name="addressLine1"
            id="addressLine1"
            value={address.addressLine1}
            className="mt-1 w-full rounded-md border-2 p-1.5"
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <div className="my-2">
          <label htmlFor="addressLine2">Area, Street, Sector, Village</label>
          <br />
          <input
            type="text"
            name="addressLine2"
            id="addressLine2"
            value={address.addressLine2}
            className="mt-1 w-full rounded-md border-2 p-1.5"
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <div className="my-2">
          <label htmlFor="landmark">Landmark</label>
          <br />
          <input
            type="text"
            name="landmark"
            id="landmark"
            value={address.landmark}
            className="mt-1 w-full rounded-md border-2 p-1.5"
            onChange={fieldChangeHandler}
          />
        </div>
        <div className="my-2 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <label htmlFor="townCity">Town/City</label>
            <br />
            <input
              type="text"
              name="townCity"
              id="townCity"
              value={address.townCity}
              className="mt-1 w-full rounded-md border-2 p-1.5"
              onChange={fieldChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <br />
            <select
              name="state"
              id="state"
              required
              value={address.state}
              onChange={fieldChangeHandler}
              className="mt-1 w-full rounded-md border bg-grey-100/50 p-2"
            >
              <option value="">Choose a state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 text-end">
          <button
            type="submit"
            className="w-1/2 rounded-md border bg-beige-500/80 py-1.5 hover:bg-beige-500"
          >
            {action === "add" ? "Add address" : "Update address"}
          </button>
        </div>
      </form>
      <div>
        {status === "addressSaved" &&
          toast.success("Address saved") &&
          navigate("/user/addresses")}
        {status === "addressUpdated" &&
          toast.success("Address updated") &&
          navigate("/user/addresses")}
      </div>
    </div>
  );
};

export default AddOrEditAddress;
