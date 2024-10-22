import { BsPerson } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; // Keep this for the carousel

function TextSlider() {
  const settings = {
    dots: false, // Disable dots
    arrows: false, // Disable arrows
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    cssEase: "linear",
  };

  const cards = [
    "Free shipping on all orders over €200",
    "Sign up for our newsletter and receive a 10% off on your first order",
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Slider Section */}
      <div style={{ width: "80%", margin: "0 auto", height: "fit-content" }}>
        <Slider {...settings} style={{ width: "100%" }}>
          {cards.map((card, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {card}
                </p>
                {index !== cards.length - 1 && <span>-</span>}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Language, Currency, and Icons Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* Language and Currency */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div>English</div>
          <div>USD</div>
        </div>

        {/* Icons */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
          <BsPerson />
          <MdOutlineSearch />
          <CiHeart />
        </div>

        {/* Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <p>Cart</p>
          <HiOutlineShoppingBag />
        </div>
      </div>
    </div>
  );
}

export default TextSlider;
