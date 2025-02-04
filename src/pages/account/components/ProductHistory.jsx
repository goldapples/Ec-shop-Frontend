import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaDolly, FaBookOpen } from "react-icons/fa";
import { ClockIcon, InboxIcon } from "@heroicons/react/24/outline";
import moment from "moment";
const ProductHistory = ({ showData, userAvatar, total }) => {
  const searchRef = useRef();
  const [flag, setFlag] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    let searchResult;
    searchResult = showData?.filter((item) => {
      if (!searchWord) return true;
      return (
        item?.productDetail?.name != undefined &&
        item?.productDetail?.name
          .toLowerCase()
          .indexOf(searchWord.toLowerCase()) > -1
      );
    });
    searchResult = showData?.filter((item) => {
      if (!searchWord) return true;
      return (
        item?.productDetail?.description != undefined &&
        item?.productDetail?.description
          .toLowerCase()
          .indexOf(searchWord.toLowerCase()) > -1
      );
    });
    setAllData(searchResult);
  }, [searchWord, showData]);
  return (
    <>
      <div className="w-full bg-white h-[500px]  rounded-xl shadow-lg">
        <div className="flex justify-between items-end pb-4 bg-pink-500 rounded-t-lg">
          <h2 className="text-lg md:text-lg sm:text-base xm:text-sm pt-6 pl-6 font-bold text-white flex items-center">
            <FaDolly className="w-6 h-6 mr-4" />
            My Product History
          </h2>
          <h2 className="text-lg md:text-lg sm:text-base xm:text-sm pt-6 pl-6 sm:pl-6 xm:pl-2 font-bold md:mr-0 xm:mr-2 text-white flex items-center">
            Total:{" "}
            {total !== undefined
              ? total.length !== 0
                ? "$" + total[0].total
                : "$" + 0
              : ""}
          </h2>
          <div className="border border-white bg-white rounded-[10px] py-1 px-2 flex items-center w-[20%] mr-6 sm:flex xm:hidden">
            <span className=" text-pink-500 hover:cursor-pointer pr-3">
              <FaSearch />
            </span>
            <input
              type="text"
              ref={searchRef}
              name=""
              onChange={(e) => {
                e.target.value ? setFlag(true) : setFlag(false);
                setSearchWord(e.target.value);
              }}
              className="outline-none bg-transparent w-[140px] text-pink-500 "
              placeholder="Search..."
            />
            <span
              className={`text-xl text-pink-500 ${
                flag === true ? `visible hover:cursor-pointer` : "invisible "
              }`}
            >
              x
            </span>
          </div>
        </div>
        <div className="h-[410px] overflow-auto">
          {allData?.length != 0 ? (
            <>
              {allData?.map((item, key) => {
                return (
                  <div className=" mt-4 ml-4" key={key}>
                    <div className="flex overflow-auto w-[95%] justify-between items-center pb-1 border-b-[1px] border-b-gray-300">
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
                        <div className=" ml-4 w-[13%] ">
                          <h2 className="font-bold ">
                            {item?.productDetail?.name}
                          </h2>
                          <p className=" text-pink-500">
                            {item?.categoryDetail?.title}
                          </p>
                        </div>
                        <div className=" ml-6 w-[50%] sm:flex xm:hidden ">
                          <h2 className=" text-sm">
                            {item?.productDetail?.description}
                          </h2>
                        </div>

                        <div className=" ml-6 sm:flex xm:hidden">
                          <p className=" flex">
                            <ClockIcon className="w-6 h-6 mr-2" />
                            {moment(item?.date).fromNow(false)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="ml-8 flex items-center bg-pink-500 rounded-md text-white pr-2 pl-2 h-6 mr-4">
                          <h2 className="font-bold text-center">
                            ${item?.price}
                          </h2>
                        </div>
                      </div>
                    </div>
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
export default ProductHistory;
