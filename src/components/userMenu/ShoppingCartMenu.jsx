import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const ShoppingCartMenu = () => {
  return (
    <div className="flex flex-col">
      <NavLink>
        <ShoppingBagIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </NavLink>
      <span className="text-xs">Bag</span>
    </div>
  );
};

export default ShoppingCartMenu;
