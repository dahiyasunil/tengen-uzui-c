import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../features/productSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const { price } = useSelector((state) => state.product.filters);
  const MIN_PRICE = 100;
  const MAX_PRICE = 5000;
  const [priceValue, setPriceValue] = useState(MIN_PRICE);

  const priceHandler = (e) => {
    const priceVal = e.target.value;
    if (priceVal > MIN_PRICE) {
      dispatch(updateFilters({ price: priceVal }));
    } else {
      dispatch(updateFilters({ price: null }));
    }
  };

  useEffect(() => {
    if (price === null) {
      setPriceValue(MIN_PRICE);
    }
  }, [price]);

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
          className="w-full accent-beige-500"
          value={priceValue}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step="100"
          onChange={(e) => setPriceValue(e.target.value)}
          onMouseUp={priceHandler}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
