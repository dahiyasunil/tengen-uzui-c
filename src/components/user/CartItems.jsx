import BagCard from "../cards/BagCard";

const CartItems = ({ bag }) => {
  return (
    <section className="col-span-6 mr-20">
      {bag.map((item) => (
        <div
          key={item.item._id + item.size}
          className="bottom-2 mb-4 w-5/6 justify-self-end border"
        >
          <BagCard item={item} />
        </div>
      ))}
    </section>
  );
};

export default CartItems;
