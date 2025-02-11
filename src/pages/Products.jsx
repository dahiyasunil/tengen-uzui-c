import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import FilterAside from "../components/FilterAside";
import { getFinalPrice } from "../utils/getPrice";
import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isFilter, filters, status, error } = useSelector(
    (state) => state.product,
  );

  let productList = products;
  if (status === "success") {
    if (isFilter) {
      const { category, price, rating, sortBy } = filters;

      if (category && category.length > 0) {
        productList = [];
        category.forEach((c) => {
          productList = [
            ...productList,
            ...products.filter((product) => product.targetAudience.includes(c)),
          ];
        });
      }

      if (price) {
        productList = productList.filter(
          (product) => product.price.amount <= price,
        );
      }

      if (rating) {
        productList = productList.filter(
          (product) => product.rating >= parseFloat(rating),
        );
      }

      if (sortBy.price) {
        if (sortBy.price === "lowToHigh") {
          productList = productList.toSorted(
            (a, b) => getFinalPrice(a) - getFinalPrice(b),
          );
        } else {
          productList = productList.toSorted(
            (a, b) => getFinalPrice(b) - getFinalPrice(a),
          );
        }
      }
    } else {
      productList = products;
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products]);

  return (
    <div className="container py-10">
      {error && (
        <div className="text-center">
          <p className="text-xl text-red-600">
            An error occured. Sorry for inconvenience!
          </p>
        </div>
      )}
      {status === "loading" && (
        <div className="text-center">
          <p className="text-xl text-beige-500">Loading data...</p>
        </div>
      )}
      {status === "success" && (
        <div className="grid md:grid-cols-12">
          <aside className="col-span-3 hidden text-sm md:mr-8 md:block md:py-4">
            <FilterAside />
          </aside>
          <section className="col-span-9">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {productList.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Products;
