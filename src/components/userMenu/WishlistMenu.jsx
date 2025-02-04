import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const WishlistMenu = ({ loginDialogHandler }) => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);

  const wishlistHandler = () => {
    if (loggedIn) {
      navigate("/wishlist");
    }
    loginDialogHandler();
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/wishlist");
    }
  }, [loggedIn]);

  return (
    <div className="flex flex-col">
      <button onClick={wishlistHandler}>
        <HeartIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </button>
      <span className="text-xs">Wishlist</span>
    </div>
  );
};

export default WishlistMenu;
