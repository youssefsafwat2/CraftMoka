import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/v1/orders/";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ shippingInfo, cartItems }, { rejectWithValue }) => {
    const orderData = {
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.zipCode,
        country: shippingInfo.country,
      },
      paymentMethod: "Cash on Delivery", // If needed, make this dynamic.
    };

    try {
      const response = await axios.post(API_URL, orderData, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to place order." }
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      return response.data.data; // Corrected response structure assumption
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders." }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: "idle",
    error: null,
    orderDetails: null,
    orders: [],
  },
  reducers: {
    resetOrderState: (state) => {
      state.status = "idle";
      state.error = null;
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.orders; // Assuming the data has `orders`
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

// Memoized Selector
export const selectOrders = createSelector(
  (state) => state.order.orders, // Input selector
  (orders) => orders // Output selector
);

// Export the reducer
export default orderSlice.reducer;
