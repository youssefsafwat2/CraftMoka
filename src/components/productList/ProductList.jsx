import { useEffect, useState } from "react";
import Product from "../product/Product";
import "./../../index.css";
import axios from "axios";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/products/"
        );

        // Access the products array correctly
        setProducts(response.data.data.data); // Adjusted according to your API response
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(
            (product) =>
              product.stock > 0 && (
                <Product product={product} key={product.slug} />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
