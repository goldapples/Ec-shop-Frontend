import React, { useEffect, useState } from "react";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import {
  InboxIcon,
  ClockIcon,
  HandThumbUpIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import moment from "moment";
const ProductHistory = ({ showData, userAvatar }) => {
  const [flag, setFlag] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    let searchResult;
    searchResult = showData?.filter((item) => {
      if (!searchWord) return true;
      return (
        item.title != undefined &&
        item.title.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      );
    });
    searchResult = showData?.filter((item) => {
      if (!searchWord) return true;
      return (
        item.categoryTitle != undefined &&
        item.categoryTitle.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      );
    });
    searchResult = showData?.filter((item) => {
      if (!searchWord) return true;
      return (
        item.description != undefined &&
        item.description.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      );
    });
    setAllData(searchResult);
  }, [searchWord, showData]);
  return (
    <>
      <div className="w-full bg-white h-[500px] rounded-xl shadow-lg overflow-auto">
        <div className="flex justify-between items-end pb-4 bg-minionBlue rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className=" text-lg pt-6 pl-6 font-bold text-white flex items-center">
              <FaBookOpen className="w-6 h-6 mr-4" />
              My Article
            </h2>
          </div>
          <div className="border border-white bg-white rounded-[10px] py-1 px-2 flex items-center w-[20%] mr-6 sm:flex xm:hidden">
            <span className=" text-minionBlue hover:cursor-pointer pr-3">
              <FaSearch />
            </span>
            <input
              type="text"
              name=""
              onChange={(e) => {
                e.target.value ? setFlag(true) : setFlag(false);
                setSearchWord(e.target.value);
              }}
              className="outline-none bg-transparent w-[140px] text-minionBlue "
              placeholder="Search..."
            />
            <span
              className={`text-xl  text-minionBlue ${
                flag === true ? `visible hover:cursor-pointer` : "invisible "
              }`}
            >
              x
            </span>
          </div>
        </div>
        <div className="h-[410px]">
          {allData?.length != 0 ? (
            <>
              {allData?.map((item, key) => {
                return (
                  <Link to={`/app/article/${item?._id}`} key={key}>
                    <div className=" mt-4 ml-4 ">
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
                          <div className=" ml-4 w-[20%] ">
                            <h2 className="font-bold ">{item?.title}</h2>
                            <p className="  text-minionBlue"></p>
                          </div>
                          <div className=" ml-6 flex md:flex xm:hidden">
                            <h2
                              className="w-[100%] h-16 overflow-hidden text-sm "
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            ></h2>
                          </div>
                        </div>
                        <div className="flex">
                          <div className=" ml-6 w-32 md:flex xm:hidden">
                            <p className=" flex ">
                              <ClockIcon className="w-6 h-6 mr-2" />
                              {moment(item?.createdAt).fromNow(false)}
                            </p>
                          </div>
                          <div className="flex items-center bg-white border-minionBlue border rounded-md pr-4 pl-4 h-8 mr-4 sm:flex xm:hidden">
                            <HandThumbUpIcon className='"w-6 h-6  text-minionBlue mr-2 ' />
                            <h2 className="font-bold text-center text-minionBlue">
                              {item?.like?.length}
                            </h2>
                          </div>
                          <div className="ml-1 flex items-center bg-minionBlue rounded-md pr-4 pl-4 h-8 mr-4">
                            <EyeIcon className='"w-6 h-6  text-white mr-2 ' />
                            <h2 className="font-bold text-center text-white">
                              {item?.view?.length}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
