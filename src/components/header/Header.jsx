import Navbar from "../navbar/Navbar";
import "./Header.css";

function Header() {
  return (
    <div
      className="relative isolate px-6 pt-0 lg:px-8" // Set pt to 0
      style={{
        backgroundImage: `url('https://arozjewelry.com/modules/ps_imageslider/images/e8afc1103f71fab5ec6308d0ea46fe4071a9c15f_spela.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#FFFFFF",
      }}
    >
      <header className="relative z-50 bg-white-800 bg-opacity-70">
        <Navbar />
      </header>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Unveil the Beauty of Artisan Jewelry
          </h1>
          <p className="mt-6 text-lg leading-8">
            Explore our exquisite collection of handcrafted jewelry, where each
            piece tells a unique story. From stunning rings to elegant
            necklaces, find the perfect accessory to express your individuality
            and celebrate special moments.
          </p>
          <div className="explore-btn mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className=" rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Explore Now <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
