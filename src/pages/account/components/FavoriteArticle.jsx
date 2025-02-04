import React from "react";
import { FaHeart, FaEyeDropper } from "react-icons/fa";
import {
  EyeIcon,
  InboxIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const FavoriteArticle = ({ userAvatar, showData }) => {
  return (
    <>
      <div className="w-full bg-white h-[500px] rounded-xl shadow-lg">
        <div className="flex justify-between items-center pb-4 bg-pink-500 rounded-t-lg">
          <h2 className=" text-lg pt-6 pl-6 font-bold text-white flex items-center">
            <FaEyeDropper className="mr-2" />
            Reviewed Articles
          </h2>
          <h2 className=" text-lg pt-6 pl-6 pr-6 text-white ">
            {showData?.length}
          </h2>
        </div>
        <div className="h-[410px] overflow-auto">
          {showData ? (
            <div>
              {showData?.map((item, key) => {
                return (
                  <div key={key}>
                    <Link to={`/app/article/${item?._id}`}>
                      <div className="mt-4 ml-4 overflow-auto w-[95%] flex justify-between items-center pb-1 border-b-[1px] border-b-gray-300 ">
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
                          <div className=" ml-4 w-[60%] ">
                            <h2 className="font-bold ">{item?.title}</h2>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center bg-pink-500 rounded-md text-white pr-2 pl-1 h-6 mr-4 sm:flex xm:hidden">
                            <HandThumbUpIcon className='"w-6 h-6  text-white mr-2 ' />
                            <span>{item?.view?.length}</span>
                          </div>
                          <div className="flex items-center bg-pink-500 rounded-md text-white pr-2 pl-1 h-6 mr-4 ">
                            <EyeIcon className='"w-6 h-6  text-white mr-2 ' />
                            <span>{item?.view?.length}</span>
                          </div>
                          <div className="flex items-center bg-slate-200 rounded-full justify-center text-pink-500  p-2 mr-4 text-lg sm:flex xm:hidden">
                            <FaHeart />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
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
export default FavoriteArticle;
