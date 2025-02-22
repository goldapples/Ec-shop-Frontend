import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import {
  EyeIcon,
  HandThumbUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
const DashboardUserTable = ({ title, showData }) => {
  return (
    <div className="w-full h-[400px] overflow-auto ">
      <h3 className="mt-1 flex items-center text-gray-500 text-xl gap-2">
        <FaUserGraduate className="h-6 w-6" /> {title}
      </h3>
      <table className=" w-full  mt-4">
        <thead className="border-b-[2px] border-minionBlue m-2">
          {showData?.length != 0 && (
            <tr>
              <th className=" px-4 text-minionBlue text-lg">Avatar</th>
              <th className=" px-4 text-minionBlue text-lg">User</th>
              <th className=" px-4 text-minionBlue text-lg">Articles</th>
              <th className=" px-4 text-minionBlue text-lg">Rate</th>
              <th className=" px-4 text-minionBlue text-lg">Thumbs</th>
            </tr>
          )}
        </thead>
        <tbody className="w-full">
          {showData?.map((item, key) => {
            return (
              <tr
                className="border-b-[1px] border-b-gray-300 hover:bg-[#ddfaff] duration-300 ease-linear h-2"
                key={key}
              >
                <td className="text-center w-10">
                  <img
                    className=" w-11 h-11 rounded-full ml-4 mt-2 mb-2"
                    src={
                      item?._id?.avatar?.length
                        ? process.env.REACT_APP_API_BASE_URL +
                          "/api/file/download/" +
                          item?._id?.avatar[0]
                        : "/image/avatar.png"
                    }
                  />
                </td>
                <td className="text-center "> {item?._id?.email}</td>
                <td className="text-center "> {item?.articleNum}</td>
                <td className="text-center  mt-2">
                  {" "}
                  <div className="flex justify-center">
                    <EyeIcon className="w-5 h-5 mr-1" />
                    {item?.view}
                  </div>
                </td>
                <td className="text-center  mt-2">
                  {" "}
                  <div className="flex justify-center">
                    <HandThumbUpIcon className="w-5 h-5 mr-1" />
                    {item?.like}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showData?.length ? (
        ""
      ) : (
        <div className="w-full flex flex-col justify-center m-auto items-center py-20">
          <InboxIcon className="w-20 opacity-[0.7] py-3" />
          <span className=" text-xl opacity-[0.7]">No category found!</span>
        </div>
      )}
    </div>
  );
};

export default DashboardUserTable;
