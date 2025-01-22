import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/productSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);

  const categoryHandler = (e) => {
    const { checked, value } = e.target;
    const category = checked
      ? [...selectedCategory, value]
      : selectedCategory.filter((c) => c != value);

    setSelectedCategory(category);
    dispatch(updateFilters({ category }));
  };

  return (
    <div className="my-8">
      <p className="mb-2 text-base font-semibold">Categories</p>
      <div className="my-1">
        <label htmlFor="women">
          <input
            type="checkbox"
            id="women"
            value="women"
            className="mr-1 accent-beige-500"
            onChange={categoryHandler}
          />
          Women
        </label>
      </div>
      <div className="my-1">
        <label htmlFor="men">
          <input
            type="checkbox"
            id="men"
            value="men"
            className="mr-1 accent-beige-500"
            onChange={categoryHandler}
          />
          Men
        </label>
      </div>
      <div className="my-1">
        <label htmlFor="girls">
          <input
            type="checkbox"
            id="girls"
            value="girls"
            className="mr-1 accent-beige-500"
            onChange={categoryHandler}
          />
          Girls
        </label>
      </div>
      <div className="my-1">
        <label htmlFor="boys">
          <input
            type="checkbox"
            id="boys"
            value="boys"
            className="mr-1 accent-beige-500"
            onChange={categoryHandler}
          />
          Boys
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
