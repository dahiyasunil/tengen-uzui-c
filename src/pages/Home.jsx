import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewCollectionSection from "../components/NewCollectionSection";
import PromoSection from "../components/PromoSection";
import { fetchProducts } from "../features/productSlice";
import { updateUserLocalBagAction } from "../features/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loggedIn) {
      dispatch(updateUserLocalBagAction());
    }
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <PromoSection />
      <NewCollectionSection />
    </div>
  );
};

export default Home;
