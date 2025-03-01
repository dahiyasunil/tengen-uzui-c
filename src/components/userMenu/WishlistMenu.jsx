import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/outline";

const WishlistMenu = ({ loginDialogHandler }) => {
  const navigate = useNavigate();
  const {
    loggedIn,
    user: { wishlist },
  } = useSelector((state) => state.user);

  const wishlistHandler = () => {
    if (loggedIn) {
      navigate("/wishlist");
    } else {
      loginDialogHandler("/wishlist");
    }
  };

  return (
    <div className="flex flex-col">
      <button onClick={wishlistHandler} className="relative">
        {wishlist && wishlist.length > 0 && (
          <span className="absolute bottom-3 left-6 flex size-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 bg-opacity-90">
              <small className="absolute bottom-0.5 left-1 text-xs text-white">
                {wishlist.length}
              </small>
            </span>
          </span>
        )}
        <HeartIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </button>
      <span className="text-xs">Wishlist</span>
    </div>
  );
};

export default WishlistMenu;
