import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import BasicModal from "../../components/BasicModal";
import { showNotification } from "../../redux/headerSlice";

export default function RightSide({ getId, member, setFlag, flag, allUsers }) {
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupFocusFlag, setGroupFocusFlag] = useState(0);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [datas, setDatas] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const groupOnClick = (index, id) => {
    getId(id);
    setGroupFocusFlag(index);
  };

  const generalOnClick = () => {
    setGroupFocusFlag(0);
    getId(0);
  };

  const createGroup = async () => {
    if (!groupTitle || !groupDescription) {
      dispatch(
        showNotification({
          message: "Input correctly",
          status: 0,
        })
      );
    } else {
      await window.socket.emit("C2S_CREATE_NEW_ROOM", {
        title: groupTitle,
        description: groupDescription,
        creator: user?._id,
        date: new Date(),
      });
      setGroupTitle("");
      setGroupDescription("");
    }
  };

  useEffect(() => {
    if (searchParam !== "") {
      setDatas(
        groups.filter((card) => {
          return (
            card.title.toLowerCase().search(searchParam.toLowerCase()) !== -1
          );
        })
      );
    } else {
      setDatas(groups);
    }
  }, [searchParam, groups]);

  const addGroup = async (id, roomId) => {
    await window.socket.emit("C2S_ADD_GROUP", {
      id: id,
      roomId: roomId,
    });

    window.socket.on("S2C_ERROR_MESSAGE", (data) => {
      dispatch(
        showNotification({
          message: data.message,
          status: 0,
        })
      );
    });
    setFlag((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    window.socket?.emit("C2S_GET_ALL_ROOMS");
    window.socket?.on("S2C_CREATE_NEW_GROUP", (data) => {
      setGroups(data.res);
    });
  }, [addGroup]);

  const deleteGroup = async (id) => {
    await window.socket.emit("C2S_DELETE_GROUP", id);
  };

  return (
    <div className="w-2/12 h-[calc(100vh-110px)] overflow-y-scroll  border-l-[.0625rem] py-4 px-2">
      <div>
        <div className="flex items-center justify-between gap-2 py-4 pl-4 pr-4">
          <FaPlus
            onClick={() => setOpenModal(true)}
            className="p-1 border-[.1875rem] w-8 h-8 text-minionBlue hover:text-white hover:bg-minionBlue hover:border-minionBlue border-minionBlue rounded-md duration-200 ease-linear "
          ></FaPlus>
          <span className=" text-lg font-bold text-[#0f2c31]">New Group</span>
        </div>
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchParam(e.target.value)}
          className="mt-4 font-sans w-full bg-[#f5f7fb] text-[#0f2c31]  rounded-md border-[.0625rem] border-white text-lg py-1 px-4 text-md focus:border-minionBlue focus:outline-none "
        />
      </div>
      <div className="py-4 ">
        <div
          className={`flex items-center gap-4 justify-between px-2 py-4 hover:bg-[#d5f4fa] rounded-md pr-6 cursor-pointer duration-200 ease-linear ${
            groupFocusFlag === 0 ? "bg-[#d5f4fa]" : "bg-white"
          }`}
        >
          <div
            onClick={() => {
              generalOnClick();
            }}
          >
            <div className="flex items-center gap-4 justify-start">
              <div className="flex justify-center items-center w-12 h-12 pt-1  bg-minionBlue bg-opacity-25 rounded-full ">
                <h3 className="text-minionBlue text-2xl font-bold">
                  {"General".slice(0, 1).toUpperCase()}
                </h3>
              </div>
              <h3 className="text-[#0f2c31] text-xl font-normal"># General</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h4 className="text-minionRed bg-[#FFD9CC] px-2 h-6 rounded-xl">
              +{member}
            </h4>
          </div>
        </div>
        {datas?.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex items-center gap-4 justify-between px-2 py-4 hover:bg-[#d5f4fa] rounded-md pr-6 cursor-pointer duration-200 ease-linear ${
                groupFocusFlag === index + 1 ? "bg-[#d5f4fa]" : "bg-white"
              }`}
            >
              <div
                onClick={() => {
                  groupOnClick(index + 1, item?._id);
                }}
              >
                <div className="flex items-center gap-4 justify-start">
                  <div className="flex justify-center items-center w-12 h-12 pt-1  bg-minionBlue bg-opacity-25 rounded-full ">
                    <h3 className="text-minionBlue text-2xl font-bold">
                      {item?.title?.slice(0, 1).toUpperCase()}
                    </h3>
                  </div>
                  <h3 className="text-[#0f2c31] text-xl font-normal">
                    # {item.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <h4 className="text-minionRed bg-[#FFD9CC] px-2 h-6 rounded-xl">
                  +{item?.users?.length}
                </h4>
                {groupFocusFlag === index + 1 ? (
                  item?.creator === user?._id ? (
                    <div className=" flex flex-col justify-between h-full gap-4">
                      <FaPlus
                        onClick={() => {
                          addGroup(user?._id, item._id);
                        }}
                        className="p-1 border-[.1875rem] w-6 h-6 text-minionBlue hover:text-white hover:bg-minionBlue hover:border-minionBlue border-minionBlue rounded-md duration-200 ease-linear "
                      />
                      <CloseOutlined
                        onClick={() => deleteGroup(item?._id)}
                        className="p-1 border-[.1875rem] w-6 h-6 text-minionBlue hover:text-white hover:bg-minionBlue hover:border-minionBlue border-minionBlue rounded-md duration-200 ease-linear "
                      />
                    </div>
                  ) : (
                    <div className=" flex flex-col justify-between h-full gap-4">
                      <FaPlus
                        onClick={() => {
                          addGroup(user?._id, item._id);
                        }}
                        className="p-1 border-[.1875rem] w-6 h-6 text-minionBlue hover:text-white hover:bg-minionBlue hover:border-minionBlue border-minionBlue rounded-md duration-200 ease-linear "
                      />
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/** Modal Body */}
      <div
        className={`${
          openModal === true
            ? "fixed top-0 left-0 z-50  w-[100%] h-[100%] opacity-100 duration-500 ease-linear"
            : "opacity-0 duration-300 ease-linear"
        } `}
      >
        {/** out Modal pan */}
        <div
          className="w-[100%] h-[100%] bg-gray-800 bg-opacity-60 cursor-pointer"
          onClick={() => setOpenModal(false)}
        ></div>

        {/** Modal main part */}
        <div className="w-[25rem] bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-6 pr-6 pb-6 bg-base-100 rounded-xllue shadow-xl mt-6 rounded-xl">
          <div className="flex justify-between items-center pb-4">
            <h3 className="text-minionBlue text-2xl ">New Group</h3>
            <button
              className="cursor-pointer text-4xl text-minionBlue"
              onClick={() => setOpenModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="py-4">
            <div className="flex flex-col items-start pt-4">
              <label
                className="pb-2 text-lg text-[#0f2c31]"
                htmlFor="groupName"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter the group name..."
                className=" font-sans w-full bg-[#f5f7fb] text-[#0f2c31]  rounded-md border-[.0625rem] border-white text-lg py-1 px-2 text-md focus:border-minionBlue focus:outline-none"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start pt-8">
              <label
                className="pb-2 text-lg text-[#0f2c31]"
                htmlFor="groupDesciption"
              >
                Description
              </label>
              <textarea
                type="text"
                placeholder="Enter the description..."
                className=" font-sans w-full bg-[#f5f7fb] text-[#0f2c31]  rounded-md border-[.0625rem] border-white text-lg py-1 px-2 h-40 text-md focus:border-minionBlue focus:outline-none "
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start items-center pt-6">
            <button
              className="w-28 flex justify-center items-center gap-1 px-4 py-2 hover:text-minionRed hover:bg-white border-[.0625rem] hover:border-minionRed font-sans rounded-md   text-white bg-minionRed duration-300 ease-out"
              onClick={() => {
                createGroup();
                setOpenModal(false);
              }}
            >
              <FaSave /> Create
            </button>
            <button
              className="w-28 flex justify-center items-center gap-1 px-4 py-2 hover:text-minionBlue hover:bg-white border-[.0625rem] border-minionBlue font-sans  rounded-md mx-2 text-white bg-minionBlue duration-300 ease-out"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/** end Modal Body */}
    </div>
  );
}
