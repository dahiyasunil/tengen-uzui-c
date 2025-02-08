import { Link } from "react-router-dom";
import ShowPrice from "./ShowPrice";

const BagCard = ({ item }) => {
  const getPrimaryImage = () => {
    return item.images.find((img) => img.isPrimary);
  };

  return (
    <div>
      <Link to={`/productDetails/${item._id}`}>
        <div className="flex flex-col sm:flex-row">
          <div>
            <img src={getPrimaryImage().url} alt={item.name} className="w-28" />
          </div>
          <div className="px-4 py-2">
            <p>
              <small>{item.title}</small>
            </p>
            <ShowPrice product={item} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BagCard;
