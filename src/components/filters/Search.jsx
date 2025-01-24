import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchProducts } from "../../features/productSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      if (searchValue.trim().length != 0) {
        dispatch(fetchProducts(searchValue));
      }
      setSearchValue("");
    }
  };

  return (
    <div className="flex justify-center rounded bg-white py-1 ps-2 md:mt-1 md:w-64 lg:w-96">
      <input
        type="text"
        placeholder="Search"
        className="w-11/12 outline-none placeholder:text-sm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={searchHandler}
      />
      <MagnifyingGlassIcon className="w-5 text-grey-100" />
    </div>
  );
};

export default Search;
