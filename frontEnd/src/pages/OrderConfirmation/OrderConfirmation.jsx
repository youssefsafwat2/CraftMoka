import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartFromDB } from "../../redux/slices/cartSlice"; // Import clearCart action

export default function OrderConfirmation() {
  // Calculate the total price based on cart items

  const dispatch = useDispatch();
  dispatch(clearCartFromDB());
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Order Placed Successfully!
        </h2>
        <p className="mt-6 text-center text-lg text-gray-600">
          Thank you for your order! Your order has been placed successfully.
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-block rounded-md bg-[#A03907] px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-red-600 focus:outline-none"
        >
          Back to Home
        </Link>
        <Link
          to="/eshop"
          className="inline-block ml-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold leading-6 text-gray-800 hover:bg-gray-400 focus:outline-none"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
