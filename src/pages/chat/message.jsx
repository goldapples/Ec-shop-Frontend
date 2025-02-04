import React, { useState, useEffect } from "react";
import LeftSide from "./leftside";
import RightSide from "./rightSide";
import MainSide from "./mainSide";
import { useSelector } from "react-redux";
import { changeShowSideState } from "../../redux/sideSlice";
import { useDispatch } from "react-redux";

export default function Message() {
  const [userId, setUserId] = useState();
  const [roomId, setRoomId] = useState();
  const [member, setMember] = useState(0);
  const [flag, setFlag] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeShowSideState(false));
  }, []);

  return (
    <div className="flex ">
      <LeftSide
        getId={setUserId}
        roomId={roomId}
        member={setMember}
        flag={flag}
        allUsers= {allUsers}
        setAllUsers ={setAllUsers}
      />
      <MainSide userId={userId} roomId={roomId} />
      <RightSide
        getId={setRoomId}
        member={member}
        setFlag={setFlag}
        flag={flag}
        allUsers= {allUsers}
      />
    </div>
  );
}
