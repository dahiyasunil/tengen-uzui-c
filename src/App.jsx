import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./components/user/Wishlist";
import Cart from "./components/user/Cart";
import Profile from "./components/user/Profile";
import UserDetails from "./components/user/UserDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
