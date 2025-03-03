import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Search from "./filters/Search";
import Modal from "./Modal";
import Login from "./Login";
import UserNavigationMenu from "./UserNavigationMenu";

const Header = () => {
  const [modal, setModal] = useState(false);
  const { loggedIn } = useSelector((state) => state.user);
  const [route, setRoute] = useState("/");

  const loginDialogHandler = (route) => {
    if (!modal && !loggedIn) setModal(true);
    setRoute(route);
  };

  const renderModal = () => {
    return (
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
        ChildComponent={Login}
        route={route}
      ></Modal>
    );
  };

  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-50">
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
              <Search />
              <UserNavigationMenu loginDialogHandler={loginDialogHandler} />
            </div>
          </nav>
        </header>
      </div>
      {modal && renderModal()}
    </>
  );
};

export default Header;
