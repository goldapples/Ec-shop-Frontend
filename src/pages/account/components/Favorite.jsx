import React from "react";
import { FaDollarSign, FaHeart } from "react-icons/fa";
import { InboxIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Favorite = ({ userAvatar, showData }) => {
  return (
    <>
      <div className="w-full bg-white h-[500px]  rounded-xl shadow-lg">
        <div className="flex justify-between items-center pb-4 bg-minionBlue rounded-t-lg">
          <h2 className=" text-lg pt-6 pl-6 font-bold text-white flex items-center">
            <FaHeart className="mr-2" />
            My Favorite Products
          </h2>
          <h2 className=" text-lg pt-6 pl-6 pr-6 text-white ">
            {showData?.length}
          </h2>
        </div>
        <div className="h-[410px] overflow-auto">
          {showData ? (
            <>
              {showData?.map((item, key) => {
                return (
                  <div key={key}>
                    <Link to={`/app/product/view/${item?._id}`}>
                      <div className="mt-4 ml-4 overflow-auto w-[95%] flex justify-between items-center pb-1 border-b-[1px] border-b-gray-300  ">
                        <div className="flex w-full items-center">
                          <img
                            className=" w-12 h-12 rounded-lg ml-4"
                            src={
                              userAvatar?.length
                                ? process.env.REACT_APP_API_BASE_URL +
                                  "/api/file/download/" +
                                  userAvatar[0]
                                : "/image/avatar.png"
                            }
                          />
                          <div className=" ml-4 w-[40%] ">
                            <h2 className="font-bold ">{item?.name}</h2>
                            <p>{item?.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center bg-minionBlue rounded-md text-white pr-2 pl-1 h-6 mr-4">
                            <FaDollarSign /> <span>{item?.price}</span>
                          </div>
                          <div className="flex items-center bg-slate-200 rounded-full justify-center text-minionBlue  p-2 mr-4 text-lg sm:flex xm:hidden">
                            <FaHeart />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="w-full flex flex-col justify-center m-auto items-center py-20">
                <InboxIcon className="w-20 opacity-[0.7] py-3" />
                <span className=" text-xl opacity-[0.7]">
                  No category found!
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Favorite;
