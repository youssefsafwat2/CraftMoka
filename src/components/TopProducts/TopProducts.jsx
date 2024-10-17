// import React from "react";
import Product from "../product/Product";
import "../../index.css";
const topProducts = [
  {
    id: 1,
    name: "Earthen Bottle",
    price: 48,
    img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    price: 35,
    img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    price: 89,
    img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    price: 35,
    img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
  },
];

function TopProducts() {
  return (
    <div className="bg-white">
      {/* Added margin-top for spacing from the top */}
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mt-12 mb-8">
        Explore Our Top Products
      </h2>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        {/* Accessibility improvement for screen readers */}
        <h2 className="sr-only">Products</h2>

        {/* Products grid */}
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
