import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/productSlice";

const SortFilter = () => {
  const dispatch = useDispatch();

  const sortFilterHandler = (e) => {
    dispatch(
      updateFilters({ sortBy: { price: e.target.value.split("-")[1] } }),
    );
  };

  return (
    <div>
      <p className="mb-2 text-base font-semibold">Sort by</p>
      <div>
        <label htmlFor="pricelowtohigh" className="flex space-x-1">
          <input
            type="radio"
            id="pricelowtohigh"
            name="sort"
            value="price-lowToHigh"
            className="mr-1 accent-beige-500"
            onChange={sortFilterHandler}
          />
          <span>Price - Low to High</span>
        </label>
      </div>
      <div>
        <label htmlFor="pricehightolow" className="flex space-x-1">
          <input
            type="radio"
            id="pricehightolow"
            name="sort"
            value="price-highToLow"
            className="mr-1 accent-beige-500"
            onChange={sortFilterHandler}
          />
          <span>Price - High to Low</span>
        </label>
      </div>
    </div>
  );
};

export default SortFilter;
