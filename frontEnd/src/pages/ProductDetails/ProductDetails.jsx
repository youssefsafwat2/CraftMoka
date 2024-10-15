import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const ProductDetails = () => {
  // State for handling the displayed image
  const [image, setImage] = useState(0); // Updated to start at index 0 for images
  const product = {
    name: "Elegant Necklace",
    price: 50,
    discount: 15,
    description: "An elegant necklace with a modern design.",
    images: [
      "/images/necklace-1.jpg",
      "/images/necklace-2.jpg",
      "/images/necklace-3.jpg",
      "/images/necklace-4.jpg",
    ],
  };
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 my-12">
        {" "}
        {/* Added my-12 for top and bottom margin */}
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Product Images */}
          <div className="md:flex-1 px-4 md:mr-8">
            {" "}
            {/* Added mr-8 to add space between images and details */}
            <div>
              <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                {/* Display selected image */}
                {product.images && (
                  <img
                    src={product.images[image]}
                    alt={product.name}
                    className="object-cover h-full w-full rounded-lg"
                  />
                )}
              </div>

              {/* Thumbnail buttons */}
              <div className="flex -mx-2 mb-4">
                {product.images &&
                  product.images.map((img, i) => (
                    <div key={i} className="flex-1 px-2">
                      <button
                        onClick={() => setImage(i)}
                        className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                          image === i ? "ring-2 ring-[#A03907] ring-inset" : ""
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="object-cover h-full w-full rounded-lg"
                        />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {product.name}
            </h2>

            {/* Price and discount */}
            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-[#A03907] mr-1 mt-1">$</span>
                  <span className="font-bold text-[#A03907] text-3xl">
                    {product.price}
                  </span>
                </div>
              </div>
              {product.discount && (
                <div className="flex-1">
                  <p className="text-green-500 text-xl font-semibold">
                    Save {product.discount}%
                  </p>
                  <p className="text-gray-400 text-sm">
                    Inclusive of all taxes
                  </p>
                </div>
              )}
            </div>

            {/* Product description */}
            <p className="text-gray-500">{product.description}</p>

            {/* Quantity selector and Add to Cart button */}
            <div className="flex py-4 space-x-4">
              <div className="relative">
                <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Qty
                </div>
                <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>

              <button
                type="button"
                className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#A03907] hover:bg-[#8A2F06] text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
