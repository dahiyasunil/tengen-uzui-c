import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EditUserDetails from "./EditUserDetails";

const UserDetails = () => {
  const [editInfo, SetEditInfo] = useState(false);
  const { user } = useSelector((state) => state.user);
  const defaultVal = "- not added -";

  if (editInfo) {
    return <EditUserDetails userDetails={user} />;
  }

  return (
    <div className="text-grey-500">
      <div className="container grid grid-cols-12 py-10">
        <section className="col-span-6">
          <h2 className="text-2xl">Personal Details</h2>
          <hr className="my-2" />
          <div className="my-3 flex justify-between">
            <p className="font-medium">Name</p>
            <p>{user.name ?? defaultVal}</p>
          </div>
          <div className="my-3 flex justify-between">
            <p className="font-medium">Mobile</p>
            <p>{user.mobileNumber}</p>
          </div>
          <div className="my-3 flex justify-between">
            <p className="font-medium">Email</p>
            <p>{user.emailId ?? defaultVal}</p>
          </div>
          <div className="mt-5 text-center">
            <button className="w-2/4 rounded-lg border bg-beige-300/80 hover:bg-beige-300">
              <NavLink
                className="inline-block w-full py-1.5"
                to="/user/edit"
                state={user}
              >
                Edit
              </NavLink>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
