import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/v1/cart/";

// Helper function to get the token and set headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Include Authorization header
    },
  };
};

// Async Thunks for API calls
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_URL, getAuthHeaders());
      return data.data.items; // Adjust according to your API response structure
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch items"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item, { rejectWithValue }) => {
    try {
      const productId = item._id;
      const response = await axios.post(
        API_URL,
        { productId, quantity: 1 },
        getAuthHeaders()
      );
      return response.data.data.items[0]; // Assuming the API returns an array, take the first item
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}remove`,
        { productId: itemId },
        getAuthHeaders()
      ); // Pass headers
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        API_URL,
        { productId: id, quantity: quantity },
        getAuthHeaders()
      ); // Pass headers
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {});

export const clearCartFromDB = createAsyncThunk(
  "cart/clearCartFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(API_URL, getAuthHeaders()); // Pass headers
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handles the error
    }
  }
);

// Initial state
const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle", // for tracking async status
  error: null, // for handling errors
};

// cartSlice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cartData = action.payload;
        state.items = cartData || []; // Ensure it's always an array
        state.totalQuantity =
          cartData.reduce((total, item) => total + item.quantity, 0) || 0;
        state.totalAmount =
          cartData.reduce((total, item) => total + item.totalPrice, 0) || 0;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // addItemToCart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newItem = action.payload;

        // Assuming newItem structure is { product: 'productId', quantity: 1, _id: 'itemId' }
        // Find if the item already exists in the cart
        const existingItem = state.items.find(
          (item) => item.product === newItem.product // Compare product IDs
        );

        if (existingItem) {
          // If the item exists, update its quantity
          existingItem.quantity += newItem.quantity;
          existingItem.totalPrice = existingItem.quantity * existingItem.price; // Assuming you have a price field elsewhere
        } else {
          // If the item does not exist, push the new item
          state.items.push({
            product: newItem.product, // Store the product ID or any other necessary data
            quantity: newItem.quantity,
            totalPrice: newItem.quantity * (newItem.price || 0), // Adjust as needed if price isn't included in newItem
          });
        }

        // Update total quantity and amount
        state.totalQuantity += newItem.quantity;
        state.totalAmount += (newItem.price || 0) * newItem.quantity; // Ensure price is handled correctly
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // removeItemFromCart
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.payload.id;
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
        state.totalAmount -= action.payload.price;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);

        if (existingItem) {
          state.totalAmount +=
            (quantity - existingItem.quantity) * existingItem.price;
          state.totalQuantity += quantity - existingItem.quantity;
          existingItem.quantity = quantity;
          existingItem.totalPrice = quantity * existingItem.price;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // clearCart
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // clearCartFromDB
      .addCase(clearCartFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartFromDB.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
      })
      .addCase(clearCartFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
