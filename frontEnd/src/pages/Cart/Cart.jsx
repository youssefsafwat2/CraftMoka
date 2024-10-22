import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
} from "../../redux/slices/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-gray-100 pt-20 text-center">
        <h1 className="text-2xl font-bold text-[#A03907]">
          Please log in to view your cart.
        </h1>
        <Link to="/signin">
          <button className="mt-6 w-1/4 rounded-md bg-[#A03907] py-3 px-4 text-sm font-medium text-white hover:bg-[#8A2F06]">
            Sign in
          </button>
        </Link>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="h-screen bg-gray-100 pt-20 text-center">
        <h1 className="text-2xl font-bold text-[#A03907]">
          Loading your cart...
        </h1>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="h-screen bg-gray-100 pt-20 text-center">
        <h1 className="text-2xl font-bold text-[#A03907]">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  const handleIncreaseQuantity = (item) => {
    dispatch(
      updateCartItemQuantity({
        id: item.product._id,
        quantity: item.quantity + 1,
      })
    ).then(() => {
      dispatch(fetchCartItems()); // Refresh cart after increasing quantity
    });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItemQuantity({
          id: item.product._id,
          quantity: item.quantity - 1,
        })
      ).then(() => {
        dispatch(fetchCartItems()); // Refresh cart after decreasing quantity
      });
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart(item.product._id)).then(() => {
      dispatch(fetchCartItems()); // Refresh cart after removing item
    });
  };

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold text-[#A03907]">
        Your Cart
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3 overflow-y-auto max-h-96">
          {" "}
          {/* Set max height and enable scrolling */}
          {items.map((product) => (
            <div
              key={product.product._id}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              {product.product.image && (
                <img
                  src={product.product.image}
                  alt={product.product.name}
                  className="w-full rounded-lg sm:w-40"
                />
              )}
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.product.name}
                  </h2>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-700">
                      $$
                      {(
                        (Number(product.product.price) || 0) *
                        (Number(product.quantity) || 0)
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="px-2 py-1 text-sm font-medium bg-gray-300 rounded"
                      onClick={() => handleDecreaseQuantity(product)}
                    >
                      -
                    </button>
                    <p>
                      {Number.isNaN(Number(product.quantity))
                        ? 0
                        : product.quantity}
                    </p>
                    <button
                      className="px-2 py-1 text-sm font-medium bg-gray-300 rounded"
                      onClick={() => handleIncreaseQuantity(product)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600 hover:underline"
                      onClick={() => handleRemoveItem(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Total</p>
            <p className="text-gray-700">
              $
              {items
                .reduce(
                  (acc, item) =>
                    acc +
                    (Number(item.product.price) || 0) *
                      (Number(item.quantity) || 0),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-center">
            <button className="w-full rounded-md bg-[#A03907] py-3 px-4 text-sm font-medium text-white hover:bg-[#8A2F06]">
              <Link to="/checkout">Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
