import { Link, NavLink } from "react-router-dom";
import {
  UserCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="from-beige-500 via-beige-100 to-beige-500 shadow-beige-100 bg-gradient-to-r pb-3 shadow-md md:py-4">
      <nav className="flex flex-col px-10 text-center md:container md:flex-row md:justify-between">
        <div>
          <Link
            to="/"
            className="text-grey-700 my-2 flex justify-self-center text-3xl tracking-wide md:my-0"
          >
            <img src="/icon.svg" alt="" className="mr-0.5 w-10" />
            UrbanLuxe
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-10">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="w-9/12 rounded-md bg-white/75 p-1 outline-none md:mt-1 md:w-64 lg:w-96"
            />
          </div>
          <div className="hidden md:flex md:space-x-5">
            <div className="flex flex-col">
              <button>
                <UserCircleIcon className="text-grey-300 hover:text-grey-700 size-5 justify-self-center transition duration-200" />
              </button>
              <span className="text-xs">Profile</span>
            </div>
            <div className="flex flex-col">
              <button>
                <HeartIcon className="text-grey-300 hover:text-grey-700 size-5 justify-self-center transition duration-200" />
              </button>
              <span className="text-xs">Wishlist</span>
            </div>
            <div className="flex flex-col">
              <button>
                <ShoppingBagIcon className="text-grey-300 hover:text-grey-700 size-5 justify-self-center transition duration-200" />
              </button>
              <span className="text-xs">Bag</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
