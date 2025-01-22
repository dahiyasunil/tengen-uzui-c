import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/productSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const MIN_PRICE = 100;
  const MAX_PRICE = 5000;

  const priceHandler = (e) => {
    const price = e.target.value;
    if (price > MIN_PRICE) {
      dispatch(updateFilters({ price }));
    } else {
      dispatch(updateFilters({ price: null }));
    }
  };

  return (
    <div className="my-8">
      <p className="mb-2 text-base font-semibold">Price</p>
      <div>
        <div className="flex justify-between text-xs">
          <span>100</span>
          <span>5000</span>
        </div>
        <input
          type="range"
          id=""
          className="w-full accent-beige-500"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step="100"
          onMouseUp={priceHandler}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
