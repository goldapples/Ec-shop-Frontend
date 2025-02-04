import React, { memo, useEffect, useState, useRef } from "react";
import minion from "../assets/img/about/minion.png";
import shinning from "../assets/img/about/shinning.png";
import { Link } from "react-router-dom";
const About = () => {
  const [coordsX, setCoordsX] = useState();
  const [coordsY, setCoordsY] = useState();
  const [coordsLineX, setCoordsLineX] = useState();
  const [coordsLineY, setCoordsLineY] = useState();
  const [coordsshinningX, setCoordsshinningX] = useState();
  const [coordsshinningY, setCoordsshniningY] = useState();
  const [minionWidth, setMinionWidth] = useState(100);
  const [lineWidth, setLineWidth] = useState(100);
  const sasulPan = useRef();

  const max = 200;
  const min = 70;
  const lineMax = 200;
  const lineMin = 70;
  const minionImg = () => {
    return {
      __html: `
          <img 
            src=${minion} alt="minionAni" 
            style='
              left: ${coordsX}px;
              top: ${coordsY}px;
            '/>
        `,
    };
  };

  useEffect(() => {}, [coordsX, coordsY]);
  const generateMinion = (event) => {
    setMinionWidth(Math.random() * (max - min) + min);
    setLineWidth(Math.random() * (lineMax - lineMin) + lineMin);
    setCoordsX(event.clientX);
    setCoordsY(event.clientY);
  };
  return (
    <>
      <article
        className="h-screen
         overflow-hidden
         relative 
       bg-[#252D2F] text-white text-[30px]"
        onClick={generateMinion}
      >
        <section className="smooth-up py-[120px] relative z-[10]">
          <div className="mx-auto w-full max-w-[1400px] relative z-[12]">
            <h2 className="text-center text-[72px] font-[900] mb-[100px]">
              ABOUT US
            </h2>
            <p className="leading-[3]">
              We really appreciate visiting our minion-shop.
              <br />
              The reason we made this service is only one - our Dream, To be
              greatest business-men.
              <br />
              There were number of difficulties during development, but Everyone
              had been cheering up our dev team.
              <br />
              There is nothing easy to archievement in this world ever, No pain,
              No gain.
              <br />
              The history of struggling for bright future will be memorized
              Gru's, Lucy's, Comrades', and EDU_Dev_guys'
            </p>
            <h2 className="text-center text-[72px] font-[900] mt-[200px] mb-[100px]">
              CAST
            </h2>
            <ul className="w-fit mx-auto">
              <li>
                <span>Project Manager : </span>
                <div>
                  <p>Harry Potter</p>
                  <p>Hydraulics University</p>
                </div>
              </li>
              <li>
                <span>DashBoard </span>
                <div>
                  <p>007</p>
                  <p>Light Industrial University</p>
                </div>
              </li>
              <li>
                <span>Article Content</span>
                <div>
                  <p>Apollo</p>
                  <p>Medical University</p>
                </div>
              </li>
              <li>
                <span>Article List</span>
                <div>
                  <p>Phoenix</p>
                  <p>University Science</p>
                </div>
              </li>
              <li>
                <span>Direct</span>
                <div>
                  <p>Sam</p>
                  <p>Medical University</p>
                </div>
              </li>
            </ul>
            <h2 className="text-center text-[72px] font-[900] mt-[200px] mb-[100px]">
              Real New Engineer
            </h2>
            <ul className="w-fit mx-auto">
              <li>
                <span>Product : </span>
                <div>
                  <p>Harry Potter</p>
                  <p>Bear University</p>
                </div>
              </li>
              <li>
                <span>Charge of Coin : </span>
                <div>
                  <p>Sam</p>
                  <p>Bear University</p>
                </div>
              </li>
              <li>
                <span>Account</span>
                <div>
                  <p>007</p>
                  <p>University of Deng</p>
                </div>
              </li>
              <li>
                <span>Article_Mulity_Upload</span>
                <div>
                  <p>Apollo</p>
                  <p>University of Logic</p>
                </div>
              </li>
              <li>
                <span>Article_Tree</span>
                <div>
                  <p>Phoenix</p>
                  <p>University of Logic</p>
                </div>
              </li>
            </ul>
            <h2 className="text-center text-[72px] font-[900] mt-[200px] mb-[100px]">
              SUPPORT
            </h2>
            <h3 className="text-center text-[48px] font-[900] mb-[400px]">
              Senior Developer's Group from 201,508
            </h3>
            <p className="text-center my-[50vh]">
              We are so grateful for all Gentlemen who helped us sincerely.
            </p>
          </div>
        </section>
        <div className="spread-ani absolute top-[100%] left-0 -translate-x-[70%] -translate-y-1/2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="img-minion">
          <img
            src={minion}
            style={{
              position: "absolute",
              width: `${minionWidth}px`,
              left: `${coordsX}px`,
              top: `${coordsY}px`,
            }}
            className=" -translate-x-1/2 -translate-y-1/2 animate-bounce"
          />
          <img src={minion} alt="minionAni01" />
          <img src={minion} alt="minionAni02" />
          <img src={minion} alt="minionAni03" />
          <img src={minion} alt="minionAni04" />
          <img src={minion} alt="minionAni05" />
          <img src={minion} alt="minionAni06" />
          <img src={minion} alt="minionAni07" />
          <img src={minion} alt="minionAni08" />
        </div>

        {/* <div dangerouslySetInnerHTML={minionImg()} /> */}
        <div className="img-shinning">
          <img
            src={shinning}
            alt="shinning"
            style={{
              left: `${coordsshinningX}px`,
              top: `${coordsshinningY}px`,
            }}
          />
        </div>
        <div className="line-animation">
          <div
            className="lineAni absolute"
            style={{
              right: `100px`,
              top: `10%`,
            }}
          >
            <div
              className="absolute left-0 top-0 h-[1px] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-white"
              style={{
                // width: `${lineWidth}px`,
                width: "1000px",
              }}
            >
              <img src={shinning} alt="shinningOntoLine" />
            </div>
            <div
              className="absolute left-0 top-0 h-[1px] rotate-[270deg]  translate-x-[380px] translate-y-[800px] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-white"
              style={{
                // width: `${lineWidth}px`,
                width: "1000px",
              }}
            ></div>
          </div>
        </div>
        <Link
          to="/"
          className="absolute right-4 bottom-4 animate-pulse py-2 px-8 border border-white text-[16px] hover:scale-[1.2] duration-500 z-40"
        >
          Go Back
        </Link>
      </article>
      {/* <div className="bg-[#252D2F] w-[100%] h-[100%]">
      <canvas className="w-full h-full" ref={sasulPan}></canvas>
      </div> */}
    </>
  );
};
export default memo(About);
