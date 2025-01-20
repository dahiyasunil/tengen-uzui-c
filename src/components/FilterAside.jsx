import { StarIcon } from "@heroicons/react/24/solid";

const FilterAside = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-base font-semibold">FILTERS</p>
        <button className="text-beige-700 underline underline-offset-2">
          Clear
        </button>
      </div>
      <div className="my-8">
        <p className="mb-2 text-base font-semibold">Categories</p>
        <div className="my-1">
          <label htmlFor="women">
            <input
              type="checkbox"
              id="women"
              value="women"
              className="mr-1 accent-beige-500"
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
            />
            Boys
          </label>
        </div>
      </div>
      <div className="my-8">
        <p className="mb-2 text-base font-semibold">Price</p>
        <div>
          <div className="flex w-56 justify-between text-xs">
            <span>100</span>
            <span>2500</span>
            <span>5000</span>
          </div>
          <input
            type="range"
            id=""
            className="w-56 accent-beige-500"
            min="100"
            max="5000"
          />
        </div>
      </div>
      <div className="my-8">
        <p className="mb-2 text-base font-semibold">Rating</p>
        <div>
          <label htmlFor="4star&above" className="flex space-x-1">
            <input
              type="radio"
              id="4star&above"
              name="rating"
              value="4andabove"
              className="mr-1 accent-beige-500"
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
          <label htmlFor="3star&above" className="flex space-x-1">
            <input
              type="radio"
              id="3star&above"
              name="rating"
              value="3andabove"
              className="mr-1 accent-beige-500"
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
          <label htmlFor="2star&above" className="flex space-x-1">
            <input
              type="radio"
              id="2star&above"
              name="rating"
              value="2andabove"
              className="mr-1 accent-beige-500"
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
          <label htmlFor="1star&above" className="flex space-x-1">
            <input
              type="radio"
              id="1star&above"
              name="rating"
              value="1andabove"
              className="mr-1 accent-beige-500"
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
      <div>
        <p className="mb-2 text-base font-semibold">Sort by</p>
        <div>
          <label htmlFor="pricelowtohigh" className="flex space-x-1">
            <input
              type="radio"
              id="pricelowtohigh"
              name="sort"
              value="pricelowtohigh"
              className="mr-1 accent-beige-500"
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
              value="pricehightolow"
              className="mr-1 accent-beige-500"
            />
            <span>Price - High to Low</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterAside;
