import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../redux/slices/orderSlice";

export default function Checkout() {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [error, setError] = useState(null); // State to manage errors
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const orderStatus = useSelector((state) => state.order.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      placeOrder({ shippingInfo, cartItems, token })
    );

    if (placeOrder.fulfilled.match(result)) {
      navigate("/order-confirmation");
    } else {
      setError(result.error.message || "Failed to submit order"); // Set error message
      console.error("Error submitting order:", result.error);
    }
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Checkout
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}{" "}
        {/* Error message */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          {Object.entries(shippingInfo).map(([key, value]) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-900"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {/* Capitalize label */}
              </label>
              <input
                id={key}
                name={key}
                type="text"
                required
                value={value}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A03907]"
              />
            </div>
          ))}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#A03907] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A03907]"
              disabled={orderStatus === "loading"}
            >
              {orderStatus === "loading" ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="text-lg font-semibold text-gray-900">Your Cart Items</h3>
        <ul className="mt-4 space-y-2">
          {cartItems.length === 0 ? (
            <li className="flex justify-between">No items in cart.</li>
          ) : (
            cartItems.map((item) => (
              <li key={item.id || item._id} className="flex justify-between">
                <span>{item.product.name}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))
          )}
        </ul>
        <div className="flex justify-between font-semibold mt-4">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}
