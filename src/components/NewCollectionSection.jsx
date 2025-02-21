import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/productSlice";
import NewArrivalCard from "./cards/NewArrivalCard";

const NewCollectionSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCollectionHandler = (e) => {
    const collectionType = e.currentTarget.dataset.collectiontype;
    dispatch(fetchProducts(collectionType));
    navigate("/products");
  };

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="my-14 grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2">
        <NewArrivalCard
          collectionType="men&summer"
          image="https://res.cloudinary.com/dqexhg2mq/image/upload/v1736584914/img3_wot4tq.jpg"
          catchPhrase="Checkout our latest collection of summer wear for Men"
          collectionHandler={newCollectionHandler}
        />
        <NewArrivalCard
          collectionType="women&summer"
          image="https://res.cloudinary.com/dqexhg2mq/image/upload/v1736599149/img4_jd58jr.jpg"
          catchPhrase="Checkout our latest collection of summer wear for Women"
          collectionHandler={newCollectionHandler}
        />
      </div>
    </section>
  );
};

export default NewCollectionSection;
