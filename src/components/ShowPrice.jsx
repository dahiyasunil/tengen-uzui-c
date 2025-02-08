import { isOnDiscount, getFinalPrice } from "../utils/getPrice";

const ShowPrice = ({ product }) => {
  return (
    <p>
      <small>
        {isOnDiscount(product) ? (
          <span className="font-semibold">
            &#8377;{getFinalPrice(product)}{" "}
            <span className="font-normal text-grey-100 line-through">
              &#8377;{product.price.amount}
            </span>
            <span>
              <small className="font-extralight text-beige-700">
                {" "}
                ({product.discount.percentage}% off)
              </small>
            </span>
          </span>
        ) : (
          <span className="font-semibold">&#8377;{product.price.amount}</span>
        )}
      </small>
    </p>
  );
};

export default ShowPrice;
