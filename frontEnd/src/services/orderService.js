// services/orderService.js
import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
}/api/v1/orders/`;

export const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};
