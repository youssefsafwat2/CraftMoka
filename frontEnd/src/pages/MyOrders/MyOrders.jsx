import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectOrders } from "../../redux/slices/orderSlice"; // Use selectOrders
import "./MyOrders.css"; // Import the CSS file

const MyOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const { status, error } = useSelector((state) => ({
    status: state.order.status,
    error: state.order.error,
  }));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="loading-message">No orders available.</div>;
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      <div className="order-list">
        <ul className="space-y-4">
          {orders
            .slice()
            .reverse()
            .map(
              (
                order // Reverse the orders here
              ) => (
                <li key={order._id} className="order-card">
                  <h2 className="order-title">Order #{order._id}</h2>
                  <p className="order-total">Total: ${order.totalPrice}</p>
                  <p className="order-status">Status: {order.orderStatus}</p>
                  <h3 className="font-medium text-gray-700">Products:</h3>
                  <ul className="product-list">
                    {order.products.map((item, i) => (
                      <li
                        key={item.product._id + i}
                        className="product-item flex items-center mt-2"
                      >
                        <span className="text-gray-600">
                          {item.product.name}
                        </span>
                        <span className="ml-2 text-gray-500">
                          Quantity: {item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};

export default MyOrders;
