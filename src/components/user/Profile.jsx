import {
  UserIcon,
  MapPinIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <div className="container w-8/12 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
          <NavLink
            className="flex rounded-md border-2 px-5 py-2"
            to="/user/details"
          >
            <UserIcon className="size-10 text-beige-500" />
            <p className="ml-3 mt-1 flex flex-col font-medium text-grey-500">
              <span>Personal</span>
              <span className="text-xs">Name, Mobile, Email</span>
            </p>
          </NavLink>
          <NavLink
            className="flex rounded-md border-2 px-5 py-2"
            to="/user/addresses"
          >
            <MapPinIcon className="size-10 text-beige-500" />
            <p className="ml-3 mt-1 flex flex-col font-medium text-grey-500">
              <span>Address</span>
              <span className="text-xs">Addresses for orders</span>
            </p>
          </NavLink>
          <NavLink
            className="flex rounded-md border-2 px-5 py-2"
            to="/user/orders"
          >
            <ArchiveBoxIcon className="size-10 text-beige-500" />
            <p className="ml-3 mt-1 flex flex-col font-medium text-grey-500">
              <span>Orders</span>
              <span className="text-xs">Previous order details</span>
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
