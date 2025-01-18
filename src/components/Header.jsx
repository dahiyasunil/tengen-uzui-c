import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import Login from "./Login";

import {
  UserCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [modal, setModal] = useState(false);

  const loginHandler = () => {
    setModal(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-beige-500 via-beige-100 to-beige-500 pb-3 shadow-md shadow-beige-100 md:py-4">
        <nav className="flex flex-col px-10 text-center md:container md:flex-row md:justify-between">
          <div>
            <Link
              to="/"
              className="my-2 flex justify-self-center text-3xl tracking-wide text-grey-700 md:my-0"
            >
              <img src="/icon.svg" alt="" className="mr-0.5 w-10" />
              UrbanLuxe
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="flex justify-center rounded bg-white py-1 ps-2 md:mt-1 md:w-64 lg:w-96">
              <input
                type="text"
                placeholder="Search"
                className="w-11/12 outline-none placeholder:text-sm"
              />
              <MagnifyingGlassIcon className="w-5 text-grey-100" />
            </div>
            <div className="hidden md:flex md:space-x-5">
              <div className="flex flex-col">
                <NavLink onClick={loginHandler}>
                  <UserCircleIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
                </NavLink>
                <span className="text-xs">Profile</span>
              </div>
              <div className="flex flex-col">
                <NavLink onClick={loginHandler}>
                  <HeartIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
                </NavLink>
                <span className="text-xs">Wishlist</span>
              </div>
              <div className="flex flex-col">
                <NavLink>
                  <ShoppingBagIcon className="size-5 justify-self-center text-grey-300 transition duration-200 hover:text-grey-700" />
                </NavLink>
                <span className="text-xs">Bag</span>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
        ChildComponent={Login}
      ></Modal>
    </>
  );
};

export default Header;
