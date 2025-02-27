import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowPrice from "../ShowPrice";
import Modal from "../Modal";
import Login from "../Login";
import { handleWishlisting } from "../../utils/wishlistHandler";
import { removeFromCart } from "../../utils/cartHandler";
import {
  updateItemQuantityAction,
  updatedItemQuantityThunk,
} from "../../features/userSlice";

const BagCard = ({ item }) => {
  const [modal, setModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  const getPrimaryImage = () => {
    return item.item.images.find((img) => img.isPrimary);
  };

  const quantityHandler = (e) => {
    if (loggedIn) {
      dispatch(
        updatedItemQuantityThunk({
          productObjId: item.item._id,
          quantity: e.target.value,
        }),
      );
    } else {
      dispatch(
        updateItemQuantityAction({
          productObjId: item.item._id,
          quantity: e.target.value,
          size: item.size,
        }),
      );
    }
  };

  const removeFromCartHandler = (e) => {
    removeFromCart(dispatch, loggedIn, item);
  };

  const wishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleWishlisting(
      dispatch,
      loggedIn,
      setModal,
      setPendingAction,
      item.item,
    );
    if (loggedIn) {
      removeFromCart(dispatch, loggedIn, item);
    }
  };

  const renderModal = () => {
    return (
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
        ChildComponent={Login}
      ></Modal>
    );
  };

  useEffect(() => {
    if (loggedIn && pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [loggedIn, pendingAction]);

  return (
    <div>
      <div>
        <div className="grid grid-cols-12">
          <Link className="col-span-4" to={`/productDetails/${item.item._id}`}>
            <img
              src={getPrimaryImage().url}
              alt={item.item.name}
              className="w-36"
            />
          </Link>
          <div className="col-span-8 grid px-6 py-2">
            <p>
              <small>{item.item.title}</small>
            </p>
            <ShowPrice product={item.item} />
            <div>
              <p className="text-xs">
                Size: <span className="font-medium">{item.size}</span>
              </p>
            </div>
            <div className="text-xs">
              <label htmlFor="">Quantity: </label>
              <select value={item.quantity} onChange={quantityHandler}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="content-end">
              <div>
                <button
                  className="mb-1 w-full rounded bg-grey-100/80 px-3 py-1 text-xs text-white hover:bg-grey-100"
                  onClick={removeFromCartHandler}
                >
                  Remove from cart
                </button>
              </div>
              <div>
                <button
                  className="w-full rounded bg-beige-100/80 px-3 py-1 text-xs hover:bg-beige-100"
                  onClick={wishlistHandler}
                >
                  Move to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && renderModal()}
    </div>
  );
};

export default BagCard;
