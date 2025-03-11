import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../features/productSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const { price } = useSelector((state) => state.product.filters);
  const MIN_PRICE = 100;
  const MAX_PRICE = 5000;
  const [priceValue, setPriceValue] = useState(MAX_PRICE);

  const priceHandler = (e) => {
    const priceVal = e.target.value;
    dispatch(updateFilters({ price: priceVal }));
  };

  useEffect(() => {
    if (price === null) {
      setPriceValue(MAX_PRICE);
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
