import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./components/user/Wishlist";
import Cart from "./components/user/Cart";
import Profile from "./components/user/Profile";
import UserDetails from "./components/user/UserDetails";
import EditUserDetails from "./components/user/EditUserDetails";
import Addresses from "./components/user/Addresses";
import AddOrEditAddress from "./components/user/AddOrEditAddress";
import OrderSummary from "./components/OrderSummary";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Orders from "./components/user/Orders";
import OrderDetails from "./components/user/OrderDetails";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Toaster position="top-right" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/cart/address"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/details"
          element={
            <ProtectedRoutes>
              <UserDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/edit"
          element={
            <ProtectedRoutes>
              <EditUserDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/addresses"
          element={
            <ProtectedRoutes>
              <Addresses />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/orders/details"
          element={
            <ProtectedRoutes>
              <OrderDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/address/:action"
          element={
            <ProtectedRoutes>
              <AddOrEditAddress />
            </ProtectedRoutes>
          }
        />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <OrderSummary />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
