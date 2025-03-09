import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../features/productSlice";
import { StarIcon } from "@heroicons/react/24/solid";

const RatingFilter = () => {
  const dispatch = useDispatch();

  const { rating } = useSelector((state) => state.product.filters);

  const ratingHandler = (e) => {
    dispatch(updateFilters({ rating: e.target.value }));
  };

  return (
    <div className="my-8">
      <p className="mb-2 text-base font-semibold">Rating</p>
      <div>
        <label htmlFor="4star" className="flex space-x-1">
          <input
            type="radio"
            id="4star"
            name="rating"
            value={4}
            checked={rating == 4}
            className="mr-1 accent-beige-500"
            onChange={ratingHandler}
          />
          <span className="flex items-center space-x-1">
            <span>4</span>
            <span>
              <StarIcon className="w-4 text-beige-700" />
            </span>
            <span>& Above</span>
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="3star" className="flex space-x-1">
          <input
            type="radio"
            id="3star"
            name="rating"
            value={3}
            checked={rating == 3}
            className="mr-1 accent-beige-500"
            onChange={ratingHandler}
          />
          <span className="flex items-center space-x-1">
            <span>3</span>
            <span>
              <StarIcon className="w-4 text-beige-700" />
            </span>
            <span>& Above</span>
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="2star" className="flex space-x-1">
          <input
            type="radio"
            id="2star"
            name="rating"
            value={2}
            checked={rating == 2}
            className="mr-1 accent-beige-500"
            onChange={ratingHandler}
          />
          <span className="flex items-center space-x-1">
            <span>2</span>
            <span>
              <StarIcon className="w-4 text-beige-700" />
            </span>
            <span>& Above</span>
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="1star" className="flex space-x-1">
          <input
            type="radio"
            id="1star"
            name="rating"
            value={1}
            checked={rating == 1}
            className="mr-1 accent-beige-500"
            onChange={ratingHandler}
          />
          <span className="flex items-center space-x-1">
            <span>1</span>
            <span>
              <StarIcon className="w-4 text-beige-700" />
            </span>
            <span>& Above</span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default RatingFilter;
