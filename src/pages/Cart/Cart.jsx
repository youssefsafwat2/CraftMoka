import { useState } from "react";
import Navbar from "./../../components/navbar/Navbar";
import Footer from "./../../components/footer/Footer";

const Cart = () => {
  // Sample cart items data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max 2019",
      size: "36EU - 4US",
      price: 259.0,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "Nike Air Max 2020",
      price: 299.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80",
    },
  ]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold text-[#A03907]">
          Cart Items
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={item.image}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() => decreaseQuantity(item.id)}
                        className="cursor-pointer rounded-l bg-gray-200 py-1 px-3.5 duration-100 hover:bg-[#A03907] hover:text-white"
                      >
                        -
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={item.quantity}
                        readOnly
                      />
                      <span
                        onClick={() => increaseQuantity(item.id)}
                        className="cursor-pointer rounded-r bg-gray-200 py-1 px-3 duration-100 hover:bg-[#A03907] hover:text-white"
                      >
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-gray-700">
                        {(item.price * item.quantity).toFixed(3)} $
                      </p>
                      <svg
                        onClick={() => removeItem(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}{" "}
                $
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">
                  {(
                    cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) + 4.99
                  ).toFixed(2)}{" "}
                  $
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-[#A03907] py-1.5 font-medium text-white hover:bg-[#8A2F06]">
              Check out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
