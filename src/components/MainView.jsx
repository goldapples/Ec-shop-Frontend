import React from "react";
import { Carousel } from "antd";

const MainView = () => (
  <div className="relative mainView-font">
    <Carousel autoplay>
      <div className="">
        <img
          src="/image/img/1.png"
          alt="1"
          className="h-[60vh] w-full justify-center  relative transition-all"
        />
      </div>
      <div className=" ">
        <img
          src="/image/img/2.png"
          alt="1"
          className="h-[60vh] w-full justify-center  relative transition-all"
        />
      </div>
      <div className="">
        <img
          src="/image/img/3.png"
          alt="1"
          className="h-[60vh] w-full justify-center  relative transition-all"
        />
      </div>
      <div className=" ">
        <img
          src="/image/img/11.png"
          alt="1"
          className="h-[60vh] w-full justify-center  relative transition-all"
        />
      </div>
    </Carousel>

    <h1 className="  text-minionBlue text-4xl font-black  ">
      <div className=" absolute top-[5%] left-[5%]">
        {/* <img src="/logo.svg"/> */}
        Welcome to our HMPBTK+
      </div>
    </h1>
    <p className="absolute top-[30%] left-[50%] -translate-x-1/2 text-xl w-max xm:w-full xm:text-center">
      <span className="text-minionRed text-2xl font-bold">Perfect Service</span>{" "}
      combined with{" "}
      <span className="text-minionRed text-2xl font-bold">
        Wonderful Products
      </span>{" "}
      and{" "}
      <span className="text-minionRed text-2xl font-bold">
        Friendly Deliver
      </span>
    </p>
    <p className="absolute md:top-[40%]  top-[45%] left-[50%] -translate-x-1/2  text-minionRed text-4xl font-bold w-max">
      Enjoy Yourself!
    </p>
    {/* <p className=" absolute top-[75%] left-[90%] ">
      <img src="/image/img/img_flwr.gif"></img>
    </p> */}
  </div>
);
export default MainView;
