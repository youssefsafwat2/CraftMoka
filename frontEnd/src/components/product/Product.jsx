import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../redux/slices/cartSlice";
import "./Product.css";
import { Link } from "react-router-dom";

function Product({ product }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      alert("You need to log in to add items to your cart.");
      return;
    }

    await dispatch(addToCart(product));
    await dispatch(fetchCartItems());
  };

  return (
    <Link
      to={`/product-details/${product.slug}`}
      state={{ product }} // Pass product data via the "state" prop
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        <span className="cursor-pointer">
          <img
            src="/add-to-cart-icon.png" // Correct the path for the image in the public folder
            alt="Add to cart"
            className="add-to-cart-icon"
            onClick={handleAddToCart} // Click handler for add-to-cart functionality
          />
        </span>
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ${Number(product.price)}
      </p>
    </Link>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
