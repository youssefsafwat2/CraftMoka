// services/orderService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/v1/orders/";

export const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};
