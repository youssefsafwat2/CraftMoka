import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer"; // Import Footer
import Home from "./pages/home/Home";
import Eshop from "./pages/Eshop/Eshop";
import About from "./pages/about/About";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import PasswordReset from "./pages/passwordResset/PasswordResset";
import ResetConfirmation from "./pages/ResetConfirmation/ResetConfirmation";
import NewPassword from "./pages/NewPassword/NewPassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess/PasswordResetSuccess";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import MyOrders from "./pages/MyOrders/MyOrders";

import { useDispatch } from "react-redux";
import { fetchCartItems } from "./redux/slices/cartSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(fetchCartItems());

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eshop" element={<Eshop />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/reset-confirmation" element={<ResetConfirmation />} />
            <Route path="/new-password/:token" element={<NewPassword />} />
            <Route
              path="/password-reset-success"
              element={<PasswordResetSuccess />}
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
