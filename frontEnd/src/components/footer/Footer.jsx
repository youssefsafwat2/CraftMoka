import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">
              {"Let's keep in touch!"}
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex space-x-2">
              {" "}
              {/* Added flex and spacing classes */}
              <a
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                href="https://www.facebook.com" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
              <a
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-x"></i>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright ©{" "}
              <span id="get-current-year">{new Date().getFullYear()}</span>
              <a
                href="#"
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                CraftMoka{" "}
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
