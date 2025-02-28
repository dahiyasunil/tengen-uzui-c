import { useNavigate } from "react-router-dom";
import { getFinalPrice } from "../../utils/getPrice";

const CartSummary = ({ bag }) => {
  const navigate = useNavigate();

  const totalMRP = () => {
    return bag.reduce((acc, curr) => {
      acc += curr.item.price.amount * curr.quantity;
      return acc;
    }, 0);
  };

  const totalDiscount = () => {
    return bag.reduce((acc, curr) => {
      const discount =
        (curr.item.price.amount - getFinalPrice(curr.item)) * curr.quantity;
      acc += discount;
      return acc;
    }, 0);
  };

  return (
    <section className="col-span-6">
      <div className="w-4/6">
        <p className="mb-1">
          Price Details <small>({bag.length} Item)</small>
        </p>
        <hr />
        <p className="my-2 flex justify-between">
          <span>Total MRP</span>
          <span className="text-sm font-light">&#8377;{totalMRP()}</span>
        </p>
        <p className="my-2 flex justify-between">
          <span>Discount on MRP</span>
          <span className="text-sm font-light text-green-600">
            {totalDiscount() > 0 ? "- " : ""}&#8377;{totalDiscount()}
          </span>
        </p>
        <p className="my-2 flex justify-between">
          <span>Shipping fee</span>
          <span className="text-sm font-light text-green-600">FREE</span>
        </p>
        <hr />
        <p className="my-2 flex justify-between">
          <span>Total Amount</span>
          <span className="">&#8377;{totalMRP() - totalDiscount()}</span>
        </p>
        <hr />
        <button
          className="mt-8 w-full rounded bg-beige-500 py-1 hover:bg-beige-700"
          onClick={() => navigate("/checkout")}
        >
          <span className="text-white">PLACE ORDER</span>
        </button>
      </div>
    </section>
  );
};

export default CartSummary;
