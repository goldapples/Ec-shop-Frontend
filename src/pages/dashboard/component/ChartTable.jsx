import React from "react";
import _ from "lodash";
import { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination";
import { InboxIcon } from "@heroicons/react/24/outline";

export default function ChartTable({ showData }) {
  const [page, setPage] = useState(0);
  const [perpage, setPerpage] = useState(3);
  const [result, setResult] = useState([]);
  useEffect(() => {
    setResult(showData?.slice(page, page + perpage));
  }, [showData, page, perpage]);
  const choose = (next) => {
    setPage(next);
  };
  const changePerpage = (value) => {
    setPerpage(value);
  };
  return (
    <div className="h-[500px] ">
      {result.length != 0 ? (
        <>
          <div className="h-full xl:h-full xm:h-[95%] overflow-y-auto">
            <table className=" w-full ">
              <thead className="border-b-[2px] border-minionBlue m-2">
                <tr className="py-4 w-full">
                  <th className="py-4 px-4 pl-4 text-minionBlue text-lg">
                    Product
                  </th>
                  <th className="py-4 px-4 text-minionBlue text-lg">
                    Category
                  </th>
                  <th className="py-4 px-4 text-minionBlue text-lg">Price</th>
                  <th className="py-4 px-4 text-minionBlue text-lg">Sold</th>
                  <th className="py-4 px-4 text-minionBlue text-lg">Profit</th>
                </tr>
              </thead>
              <tbody className="border-t-[1px] border-minionBlack">
                {result?.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b-[1px] border-b-gray-300 h-20 hover:bg-[#ddfaff] duration-300 ease-linear"
                    >
                      <td className=" text-center text-xl py-2 flex flex-row items-center ml-4 ">
                        <img
                          className=" w-14 h-14 rounded-lg"
                          src={
                            data?.thumbnail?.length
                              ? process.env.REACT_APP_API_BASE_URL +
                                "/api/file/download/" +
                                data?.thumbnail[0]
                              : "/image/Layer0.png"
                          }
                        />
                        <h2 className=" ml-6 w-full md:w-full xm:w-32 ">
                          {data?.productName}
                        </h2>
                      </td>
                      <td className="text-center text-xl"> {data?.category}</td>
                      <td className="text-center text-xl"> ${data?.price}</td>
                      <td className="text-center text-xl">
                        {" "}
                        ${data?.sold.toFixed(1)}
                      </td>
                      <td className="text-center text-xl">
                        {" "}
                        ${data?.profit.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end pt-2">
            <Pagination
              total={showData?.length}
              page={page}
              perpage={perpage}
              choose={choose}
              setPerpage={changePerpage}
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center m-auto items-center py-20">
            <InboxIcon className="w-20 opacity-[0.7] py-3" />
            <span className=" text-xl opacity-[0.7]">No category found!</span>
          </div>
        </>
      )}
    </div>
  );
}
