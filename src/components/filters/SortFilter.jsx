import { useState } from "react";

const SortFilter = () => {
  const [sortBy, setSortBy] = useState({ price: "" });

  return (
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
  );
};

export default SortFilter;
