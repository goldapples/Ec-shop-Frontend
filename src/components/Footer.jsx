import React from "react";
import { Link } from "react-router-dom";
import youtube from "../assets/img/social/youtube.png";
import facebook from "../assets/img/social/facebook.png";
import twitter from "../assets/img/social/twitter.png";
import linkedin from "../assets/img/social/linkedin.png";

export default function Footer() {
  return (
    <footer className="bg-[#252D2F] text-[#ffffff] relative mt-[160px]">
      <div className="w-full max-w-[1440px] mx-auto px-[15px] pt-[50px]">
        <div className=" text-white text-[40px]  w-full  flex flex-col justify-center  items-center md:items-end">
          <div className="pb-[40px]  md:my-0 md:mr-[30px] ">
            <Link to="/">HMPBTK+</Link>
          </div>
          <div></div>
        </div>
        <div>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-20 mb-[40px]"
            sementic="f-g-nav"
          >
            <Link className="text-2xl" to="/app/home">
              Home
            </Link>
            <Link className="text-2xl" to="/app/product">
              product
            </Link>
            <Link className="text-2xl" to="/app/article">
              Article
            </Link>
            <Link className="text-2xl" to="/account">
              Account
            </Link>
            <Link className="text-2xl" to="/chatting">
              Chatting
            </Link>
          </nav>
        </div>
        <div>
          <nav className="flex justify-center gap-x-4 md:justify-start">
            <Link to="https://youtube.com" className="socialhref">
              <img src={youtube} alt="youtube" />
            </Link>
            <Link to="javascript:;" className="socialhref">
              <img src={facebook} alt="facebook" />
            </Link>
            <Link to="javascript:;" className="socialhref">
              <img src={twitter} alt="twitter" />
            </Link>
            <Link to={"javascript:;"} className="socialhref">
              <img src={linkedin} alt="linkedin" />
            </Link>
          </nav>
        </div>
      </div>
      <div className="text-center py-5 bg-gradient-to-b-[#252d2f, #48585c] text-xl">
        HMPBTK+ 2024 @All Right Reserved
      </div>
    </footer>
  );
}
