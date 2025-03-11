import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const ShoppingCartMenu = () => {
  const navigate = useNavigate();
  const { bag } = useSelector((state) => state.user.user);

  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <div>
      <div>
        <div className="relative">
          {bag && bag.length > 0 && (
            <span className="absolute -top-3 left-3 flex size-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 bg-opacity-90">
                <small className="absolute bottom-0.5 left-1 text-xs text-white">
                  {bag.length}
                </small>
              </span>
            </span>
          )}
        </div>
        <button onClick={cartHandler} className="flex flex-col justify-center">
          <span>
            <ShoppingBagIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
          </span>
          <span className="text-xs">Bag</span>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartMenu;
