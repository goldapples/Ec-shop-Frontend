import React from "react";
import { FaDolly, FaCoins, FaBookOpen } from "react-icons/fa";

const MyInfo = ({ userProfile, user, productNum, articleNum }) => {
  return (
    <>
      <div className="w-full bg-white h-[300px] sm:h-[300px] xm:h-auto rounded-xl shadow-lg mt-4 flex sm:flex-row xm:flex-col ">
        <div className="w-[50%] sm:w-[50%] xm:w-full divide-gray-200 flex flex-col justify-center items-center  border-r-[2px] sm:border-r-[2px] xm:border-b-[2px] sm:border-b-[0px]  border-gray-200 sm:mt-0 xm:mt-8 sm:pb-0 xm:pb-8 ">
          <img
            src={
              user?.avatar[0]
                ? process.env.REACT_APP_API_BASE_URL +
                  "/api/file/download/" +
                  user?.avatar[0]
                : "/image/avatar.png"
            }
            alt="avatar"
            className="rounded-lg w-[40%]  "
          />
          <h2 className="font-bold mt-2 text-xl">{user?.firstName}</h2>
          <p>{user?.email}</p>
        </div>
        <div className="w-[50%] sm:w-[50%] xm:w-full flex m-auto justify-center items-center sm:mt-auto xm:mt-8 sm:pb-0 xm:pb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FaCoins className="w-12 h-12 md:w-12 md:h-12 sm:h-8 sm:w-8 rounded-md bg-pink-500 p-2  text-white" />
              Current Coin:
              <h2 className="text-xl font-bold">${user?.money}</h2>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FaDolly className="w-12 h-12 md:w-12 md:h-12 sm:h-8 sm:w-8 rounded-md bg-pink-500 p-2  text-white" />
              Brought Products:
              <h2 className="text-xl font-bold">
                {productNum ? productNum : 0}
              </h2>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FaBookOpen className="w-12 h-12 md:w-12 md:h-12 sm:h-8 sm:w-8 rounded-md bg-pink-500 p-2  text-white" />
              Current Articles:
              <h2 className="text-xl font-bold">
                {articleNum ? articleNum : 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfo;
