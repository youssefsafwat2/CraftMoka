import React, { useState } from "react";
// import stylingsheet from "./stylesheader.module.css";
import { BsPerson } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Slide } from "@mui/material";
import styling from "./style.module.css";
const TextSlider = () => {
  const settings = {
    dots: false, // Disable dots if you don't need them
    arrows: false, // Disable arrows (previous/next buttons)
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
                    textWrap: "nowrap",
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
      <div>
        <div>
          <div>english</div>
          <div>USD</div>
        </div>
        <div>
          <BsPerson />
          <MdOutlineSearch />
          <CiHeart />
        </div>
        <div>
          <p>Cart</p>
          <HiOutlineShoppingBag />
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
