import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import FilterAside from "../components/FilterAside";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("loading products");
  }, []);

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-12">
        <aside className="col-span-3 hidden text-sm md:mr-8 md:block md:py-4">
          <FilterAside />
        </aside>
        <section className="col-span-9">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
