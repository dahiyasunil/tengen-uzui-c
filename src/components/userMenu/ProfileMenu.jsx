import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const ProfileMenu = ({ loginDialogHandler }) => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);

  const profileHandler = () => {
    if (loggedIn) {
      navigate("/profile");
    } else {
      loginDialogHandler("/profile");
    }
  };

  return (
    <div className="flex flex-col">
      <button onClick={profileHandler}>
        <UserCircleIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </button>
      <span className="text-xs">Profile</span>
    </div>
  );
};

export default ProfileMenu;
