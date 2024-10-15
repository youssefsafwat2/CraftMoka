import React from "react";
import stylingsheet from "./stylesheader.module.css";
import { BsPerson } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMiniBars3 } from "react-icons/hi2";

const Header = () => {
  return (
    <>
      <div className={stylingsheet.header}>
        <div className={stylingsheet.lan_and_curr}>
          <div className={stylingsheet.lan}>
            english
            <div className={stylingsheet.language_menu}>
              <ul>
                <li>English</li>
                <li>French</li>
                <li>German</li>
              </ul>
            </div>
          </div>

          <div className={stylingsheet.currency}>
            USD
            <div className={stylingsheet.curr_menu}>
              <ul>
                <li>EUR</li>
                <li>GBP</li>
                <li>USD</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={stylingsheet.user}>
          <BsPerson />
          <MdOutlineSearch />
          <CiHeart />
        </div>
        <div className={stylingsheet.cart}>
          <p>Cart</p>
          <HiOutlineShoppingBag />
        </div>
      </div>

      <div className={stylingsheet.navbar}>
        <div className={stylingsheet.bars}>
          <HiMiniBars3 />
        </div>
        <div className={stylingsheet.logo}>
          <h1>CraftMoka</h1>
        </div>
        <div className={stylingsheet.tabs}>
          <div className={stylingsheet.tab}>Eshop</div>
          {/* <div className={stylingsheet.tab}>Inspiration</div> */}
          <div className={stylingsheet.tab}>About us</div>
          <div className={stylingsheet.tab}>The shop</div>
          <div className={stylingsheet.tab}>Blog</div>
        </div>
        <div className={stylingsheet.icons}>
          <HiOutlineShoppingBag />
          <MdOutlineSearch />
        </div>
      </div>
    </>
  );
};

export default Header;
