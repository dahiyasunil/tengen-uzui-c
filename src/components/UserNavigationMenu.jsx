import ProfileMenu from "./userMenu/ProfileMenu";
import WishlistMenu from "./userMenu/WishlistMenu";
import ShoppingCartMenu from "./userMenu/ShoppingCartMenu";

const UserNavigationMenu = ({ loginHandler }) => {
  return (
    <div className="hidden pt-1 md:flex md:space-x-5">
      <ProfileMenu loginHandler={loginHandler} />
      <WishlistMenu loginHandler={loginHandler} />
      <ShoppingCartMenu />
    </div>
  );
};

export default UserNavigationMenu;
