import { NavLink } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const ProfileMenu = ({ loginDialogHandler }) => {
  return (
    <div className="flex flex-col">
      <NavLink onClick={loginDialogHandler}>
        <UserCircleIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </NavLink>
      <span className="text-xs">Profile</span>
    </div>
  );
};

export default ProfileMenu;
