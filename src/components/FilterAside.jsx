import { useDispatch } from "react-redux";
import {
  updateFilters,
  filters as filterOriginalState,
} from "../features/productSlice";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import SortFilter from "./filters/SortFilter";

const FilterAside = () => {
  const dispatch = useDispatch();
  const clearFilterHandler = () => {
    dispatch(updateFilters(filterOriginalState));
  };

  return (
    <div className="w-10/12">
      <div className="flex justify-between">
        <p className="text-base font-semibold">FILTERS</p>
        <button
          className="text-beige-700 underline underline-offset-2"
          onClick={clearFilterHandler}
        >
          Clear
        </button>
      </div>
      <CategoryFilter />
      <PriceFilter />
      <RatingFilter />
      <SortFilter />
    </div>
  );
};

export default FilterAside;
