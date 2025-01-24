import { NavLink } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const WishlistMenu = ({ loginHandler }) => {
  return (
    <div className="flex flex-col">
      <NavLink onClick={loginHandler}>
        <HeartIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </NavLink>
      <span className="text-xs">Wishlist</span>
    </div>
  );
};

export default WishlistMenu;
