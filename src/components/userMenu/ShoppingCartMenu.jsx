import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const ShoppingCartMenu = () => {
  const { bag } = useSelector((state) => state.user.user);

  return (
    <div className="flex flex-col">
      <NavLink to="/cart" className="relative">
        {bag && bag.length > 0 && (
          <span className="absolute bottom-3 left-3 flex size-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 bg-opacity-90">
              <small className="absolute bottom-0.5 left-1 text-xs text-white">
                {bag.length}
              </small>
            </span>
          </span>
        )}

        <ShoppingBagIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
      </NavLink>
      <span className="text-xs">Bag</span>
    </div>
  );
};

export default ShoppingCartMenu;
