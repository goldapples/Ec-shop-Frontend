import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import defaultImage from "../../assets/image/avatar.png";

export default function LeftSide({ getId, roomId, member,flag, allUsers, setAllUsers }) {
  const [focusFlag, setFocusFlag] = useState();
  
  const [showDetailAvatar, setShowDetailAvatar] = useState("");
  const [showDetailName, setShowDetailName] = useState("");
  const [showBio, setShowBio] = useState("");

  const { user } = useSelector((store) => store.user);

  const getAllUser = async () => {
    window.socket.emit("C2S_GET_ALL_CHAT_USER", {
      id: user?._id,
    });
    window.socket.on("S2C_GET_ALL_CHAT_USER", (data) => {
      member(data?.users?.Chatting[0]?.length);
      setAllUsers(data?.users?.Chatting[0]);
    });
  };

  const getAllRoomUser = async () => {
    
    await window.socket.emit("C2S_GET_ALL_ROOM_CHAT_USER", {
      id: roomId,
    });
    await window.socket.on("S2C_GET_ALL_ROOM_CHAT_USER", (data) => {
      setAllUsers(data?.users[0]?.Chatting);
    });
    await window.socket.emit("C2S_GET_ALL_ROOM_CHAT_USER", {
      id: roomId,
    });
    await window.socket.on("S2C_GET_ALL_ROOM_CHAT_USER", (data) => {
      setAllUsers(data?.users[0]?.Chatting);
    });
  };

  useEffect(() => {
    if (!roomId || roomId === 0) {
      getAllUser();
      showDetail();
    } 
    else {
      getAllRoomUser();
      showDetail();
    }
  }, [roomId, flag]);

  const showDetail = (avatar, firstName, bio, index, id) => {
    getId(id);
    setFocusFlag(index);
    setShowDetailAvatar(avatar);
    setShowDetailName(firstName);
    setShowBio(bio);
  };

  return (
    <div className="w-2/12 h-[calc(100vh-110px)] px-1 bg-[#f3f7ff]  overflow-y-hidden border-minionBlue border-dotted">
      <div className="h-[224px] flex flex-col items-center mx-4 my-2 bg-white rounded-xl py-4">
        <img
          src={
            showDetailAvatar?.length
              ? `${
                  process.env.REACT_APP_API_BASE_URL +
                  "/api/file/download/" +
                  showDetailAvatar
                }`
              : defaultImage
          }
          alt={showDetailName}
          className="w-32 h-32 rounded-full border-minionBlue border-2"
        />
        <h3 className="text-3xl pt-2 text-minionBlue font-bold">
          {showDetailName}
        </h3>
        <h4 className="pt-2 text-[#024754] text-lg">{showBio}</h4>
      </div>
      <div className="mt-10 overflow-y-scroll  h-[calc(100vh-360px)]">
        {allUsers?.map((user, index) => {
          return (
            <div
              key={index}
              className={`flex pr-2 pl-4  py-4 gap-8 rounded-xl items-center cursor-pointer hover:bg-[#a8f1ff] hover:border-[#2FDAF9] hover:text-white duration-300 ease-linear ${
                focusFlag === index ? "bg-[#a8f1ff]" : "bg-[#f3f7ff]"
              }`}
              onClick={() =>
                showDetail(
                  user?.avatar,
                  user?.firstName,
                  user?.bio,
                  index,
                  user?._id
                )
              }
            >
              <div className="relative">
                <span
                  className={`absolute block rounded-full right-[-2px] top-[2px] w-3 h-3 border-[1px] border-white ${
                    user.status === true ? "bg-green-400  " : "bg-gray-400"
                  }`}
                ></span>
                <img
                  src={`${
                    user?.avatar?.length !== 0
                      ? process.env.REACT_APP_API_BASE_URL +
                        "/api/file/download/" +
                        user?.avatar
                      : defaultImage
                  }`}
                  alt={user.firstName}
                  className="rounded-full  w-12 h-12 border-2 border-white"
                />
              </div>
              <div>
                <span className="text-[#024754] text-lg ml-[-12px]">
                  {user.lastName + " " + user.firstName}
                </span>
                <p className="text-gray-400 text-md pt-2 text-sm">
                  {user.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
