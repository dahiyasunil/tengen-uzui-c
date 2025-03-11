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
    <div>
      <button onClick={profileHandler} className="flex flex-col justify-center">
        <span>
          <UserCircleIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
        </span>
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
