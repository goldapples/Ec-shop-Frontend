import React, { useRef } from "react";
import { FaCoins } from "react-icons/fa";
import { showNotification } from "../../../redux/headerSlice";
import { useDispatch } from "react-redux";

const CoinCharge = ({ coin, userInfo }) => {
  const dispatch = useDispatch();
  const coinRef = useRef();
  const handleRequest = () => {
    window.socket.emit("C2S_NEW_CHARGEOFCOIN", {
      user: userInfo?.lastName,
      email: userInfo?.email,
      price: coinRef.current.value,
      description: "CoinRequest",
      receiver: "admin@gmail.com",
    });
  };
  window.socket.on("S2C_NEW_CHARGE_OF_ME", () => {
    dispatch(
      showNotification({
        message: `$${coinRef.current.value} Requested!`,
        status: 1,
      })
    );
  });
  return (
    <>
      <div className="w-full bg-white h-[250px] sm:h-[250px] xm:h-auto  rounded-xl shadow-lg flex mt-4 xl:grid items-center">
        <div className="flex w-full mr-6 sm:mr-6 xm:mr-0 justify-between sm:flex-row xm:flex-col-reverse ">
          <div className="w-[66%] sm:w-[66%] xm:w-full border-r-[2px] sm:border-r-[2px] sm:border-t-[0px] xm:border-t-[2px] xm:border-r-[0px] sm:mb-0 xm:mb-8 border-minionBlue">
            <h2 className="font-bold text-2xl text-center items-center  mt-10 text-minionBlue">
              Coin Charge Request
            </h2>
            <div className="mt-10 flex flex-col justify-center items-center w-full">
              <input
                type="number"
                placeholder="Charge..."
                min={0}
                className="border-[1px] w-[60%] bg-white  border-minionBlue font-satoshi text-xl focus:outline-none text-gray-700 focus:border-minionBlue px-4 py-1 rounded-md"
                ref={coinRef}
              />
              <div>
                <button
                  className=" bg-minionBlue mt-6 p-2 text-md text-white rounded-md hover:bg-white hover:text-minionBlue hover:border-minionBlue border "
                  onClick={() => handleRequest()}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[33%] sm:w-[33%] xm:w-full sm:mt-0 xm:mt-8  justify-center items-center sm:mb-0 xm:mb-6 ">
            <FaCoins className="w-[120px] h-[120px]  md:w-[120px] md:h-[120px] xm:w-[70px] xm:h-[70px] xm:p-3 md:p-6  rounded-md bg-minionBlue p-6  text-white" />
            <h2 className="text-2xl font-bold ">${coin ? coin : 0}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinCharge;
