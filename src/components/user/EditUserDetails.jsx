import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  resetStatus,
  updateUserPersonalDetails,
} from "../../features/userSlice";

import toast from "react-hot-toast";

const EditUserDetails = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  const user = useLocation().state;
  const [userData, setUserData] = useState({
    name: user.name ?? "",
    email: user.emailId ?? "",
  });

  const infoHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const updateDetailsHandler = (e) => {
    e.preventDefault();
    if (
      (userData.name.trim() !== "" || userData.email.trim() !== "") &&
      (user.name != userData.name || user.emailId != userData.email)
    ) {
      dispatch(updateUserPersonalDetails(userData));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, []);

  return (
    <div className="container text-grey-500">
      <div className="grid grid-cols-12 py-10">
        <section className="col-span-6">
          <h2 className="text-2xl">Edit Details</h2>
          <hr className="my-2" />
          <form onSubmit={updateDetailsHandler}>
            <div className="my-4 flex flex-col">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                className="w-3/4 rounded-md border-2 p-2"
                onChange={infoHandler}
              />
            </div>
            <div className="my-4 flex flex-col">
              <label htmlFor="name">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                className="w-3/4 rounded-md border-2 p-2"
                onChange={infoHandler}
              />
            </div>
            <div className="mt-10 text-end">
              <button className="mr-3 w-1/4 rounded-lg border bg-beige-300/80 hover:bg-beige-300">
                <NavLink
                  className="inline-block w-full py-1.5"
                  to="/user/details"
                >
                  Cancel
                </NavLink>
              </button>
              <button
                className="w-1/4 rounded-lg border bg-beige-300/80 py-1.5 hover:bg-beige-300"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className="w-1/3 text-white">
        {status === "updatingUserInfo" && toast("Saving data...")}
        {status === "userInfoUpdated" && toast.success("Details updated!")}
        {status === "failedToUpdateUserInfo" &&
          toast.error("Failed to Update. Please try again later!")}
      </div>
    </div>
  );
};

export default EditUserDetails;
