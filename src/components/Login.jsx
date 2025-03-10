import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/productSlice";

const Login = ({ closeModal, route }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(null);
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedIn) {
      closeModal();
      navigate(route);
      dispatch(fetchProducts());
      localStorage.setItem("ulub", "[]");
    }
  }, [loggedIn, closeModal]);

  const continueHandler = (e) => {
    e.preventDefault();
    if (Number(mobileNumber)) {
      setError(null);
      const userBagCache = localStorage.getItem("ulub") || "[]";
      dispatch(loginUser({ mobileNumber, bag: userBagCache }));
    } else {
      setError("Please enter a valid mobile number (10 digits)");
    }
  };

  return (
    <form>
      <div className="flex flex-col">
        <p className="mb-6 text-grey-100">
          <span className="font-semibold text-grey-500">Login</span> or
          <span className="font-semibold text-grey-500"> SignUp</span>
        </p>
        <div className="relative flex flex-row rounded bg-white p-2">
          <span className="border-r border-grey-100 pr-1.5 text-grey-500">
            +91
          </span>
          <input
            type="tel"
            placeholder="Mobile Number"
            minLength="10"
            maxLength="10"
            className="w-10/12 rounded ps-2 text-grey-500 outline-none placeholder:text-sm"
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-center text-xs text-red-800">
            <small>{error}</small>
          </p>
        )}
        <p className="my-4 text-center text-grey-500">
          <small>
            By continuing, I agree to the{" "}
            <span className="font-semibold text-beige-700">Terms of Use</span> &
            <span className="font-semibold text-beige-700">
              {" "}
              Privacy Policy
            </span>
          </small>
        </p>
        <div>
          <button
            className="w-full rounded bg-grey-100 py-2 text-beige-100"
            onClick={continueHandler}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
