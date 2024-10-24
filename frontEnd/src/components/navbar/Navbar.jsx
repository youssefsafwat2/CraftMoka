import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // Get the login state and cart item count from Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items) || []; // Ensure it's an array
  const cartItemCount = cartItems.length; // Safe to access length

  // Optional: Check login state when the component mounts
  useEffect(() => {
    // You might want to check the login state with a thunk if needed
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
    navigate("/"); // Redirect to homepage or another page after logging out
  };

  return (
    <nav
      className="flex justify-between items-center p-4 transition-all duration-300 bg-transparent"
      style={{
        width: "100%",
        margin: 0,
        backdropFilter: "none",
        boxShadow: "none",
      }}
    >
      <div className="flex items-center">
        <Link to="/">
          <img
            className="h-8 w-auto"
            src="/img/craft-moka-logo.png" // Fixed image path
            alt="Your Company"
          />
        </Link>
        <div className="ml-6 flex space-x-4">
          <Link to="/eshop" className="text-black hover:text-gray-700">
            Eshop
          </Link>
          <Link to="/about" className="text-black hover:text-gray-700">
            About
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/orders" className="text-black hover:text-gray-700">
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="text-black hover:text-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-black hover:text-gray-700">
              Sign In
            </Link>
            <Link to="/signup" className="text-black hover:text-gray-700">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/cart" className="relative bg-transparent">
          <span className="sr-only">View cart</span>
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 6h10l1.5 10H6.5L5 6zM7 20a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 rounded-full bg-red-500 text-white text-xs font-semibold px-1">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
