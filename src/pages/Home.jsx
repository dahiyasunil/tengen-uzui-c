import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewCollectionSection from "../components/NewCollectionSection";
import PromoSection from "../components/PromoSection";
import { fetchProducts } from "../features/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
