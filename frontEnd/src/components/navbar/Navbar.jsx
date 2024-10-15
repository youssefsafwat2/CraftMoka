import "./Navbar.css";

function Navbar() {
  const cartItemCount = 3; // Example count of items in the cart

  return (
    <nav
      className={
        "flex justify-between items-center p-4 transition-all duration-300 bg-transparent"
      }
      style={{
        width: "100%",
        margin: 0,
        backdropFilter: "none",
        boxShadow: "none",
      }}
    >
      <div className="flex items-center">
        <img
          className="h-8 w-auto"
          src="public/img/craft-moka-logo.png"
          alt="Your Company"
        />
        <div className="ml-6 flex space-x-4">
          <a href="#" className="text-black hover:text-gray-700">
            Eshop
          </a>
          <a href="#" className="text-black hover:text-gray-700">
            About
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-black hover:text-gray-700">
          Sign In
        </a>
        <a href="#" className="text-black hover:text-gray-700">
          Sign Up
        </a>
        <button className="relative bg-transparent">
          <span className="sr-only">View cart</span>
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 6h10l1.5 10H6.5L5 6zM7 20a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 rounded-full bg-red-500 text-white text-xs font-semibold px-1">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
