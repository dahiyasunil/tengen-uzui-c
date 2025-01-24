import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../features/productSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.product.filters);

  const categoryHandler = (e) => {
    const { checked, value } = e.target;
    const updatedCategory = checked
      ? [...category, value]
      : category.filter((c) => c != value);
    dispatch(updateFilters({ category: updatedCategory }));
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
            checked={category.includes("women")}
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
            checked={category.includes("men")}
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
            checked={category.includes("girls")}
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
            checked={category.includes("boys")}
            onChange={categoryHandler}
          />
          Boys
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
