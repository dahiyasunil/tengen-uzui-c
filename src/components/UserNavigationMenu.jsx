import ProfileMenu from "./userMenu/ProfileMenu";
import WishlistMenu from "./userMenu/WishlistMenu";
import ShoppingCartMenu from "./userMenu/ShoppingCartMenu";

const UserNavigationMenu = ({ loginDialogHandler }) => {
  return (
    <div className="hidden pt-1 md:flex md:space-x-5">
      <ProfileMenu loginDialogHandler={loginDialogHandler} />
      <WishlistMenu loginDialogHandler={loginDialogHandler} />
      <ShoppingCartMenu />
    </div>
  );
};

export default UserNavigationMenu;
