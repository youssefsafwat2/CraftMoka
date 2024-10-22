// import React from "react";
import Product from "../product/Product";
import { useEffect, useState } from "react";

import "../../index.css";
import axios from "axios";

function TopProducts() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/products/top-products"
        );

        setTopProducts(response.data.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="bg-white">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mt-12 mb-8">
        Explore Our Top Products
      </h2>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {topProducts.map((product) => (
            <Product product={product} key={product.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
