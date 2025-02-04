import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/headerSlice";

const DropdownNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allNotification, setAllNotification] = useState([]);
  const { newNotificationMessage } = useSelector((store) => store.header);
  const { user } = useSelector((store) => store.user);
  const [flag, setFlag] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  window.socket.on("S2C_CHARGE_COIN", (data) => {
    // if (data?.data?.receiver === "admin@gmail.com") {
    //   setFlag(true);
    //   dispatch(
    //     showNotification({
    //       message: `New Requested!`,
    //       status: 1,
    //     })
    //   );
    // }
  });

  window.socket.on("S2C_NEW_CHARGE_OF_ALL", (data) => {
    if (data?.data?.receiver === "admin@gmail.com") {
      setFlag(true);
      dispatch(
        showNotification({
          message: `New Requested!`,
          status: 1,
        })
      );
    }
  });

  useEffect(() => {
    const notification = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/notification/getAllNotification/${user?.email}`
      );
      setAllNotification(res.data);
    };
    notification();
    setFlag(false);
  }, [newNotificationMessage, navigate, flag]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const deleteNotification = async (id, email, date, description) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/api/notification/deleteOneNotification/${id}`
    );
    dispatch(showNotification({ message: res.data.message, status: 1 }));
    if (user.role === "admin" && description !== "CoinRequest") {
      navigate(`/app/inventory/transaction/?email=${email}&date=${date}`);
    }
  };

  return (
    <div className="relative ">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative"
      >
        <FaBell className="text-minionBlue text-[25px] " />
        {allNotification?.notifications?.length === 0 || !user ? (
          " "
        ) : (
          <span className="absolute -top-0.5 right-0 h-4  w-4 rounded-full animate-bounce bg-meta-1 bg-minionRed">
            <span className=" absolute -top-0.5 right-0 font-impact inline-flex justify-center m-[1px] h-full w-full text-[12px] text-[#ffffff] rounded-full ">
              {allNotification?.notifications?.length}
            </span>
          </span>
        )}
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute z-50 -left-[0px] sm:-left-[10px] mt-2 flex overflow-auto w-[200px] h-96 md:w-[250px] sm:h-96 flex-col rounded-sm border border-stroke bg-white shadow-default pl-6 pr-6 pb-10 ${
          dropdownOpen === true ? "block" : "hidden"
        } !important`}
      >
        <div className="px-4 py-3">
          <h5 className="text-lg font-satoshi ">Notification</h5>
        </div>
        <ul className="flex h-auto flex-col overflow-y-auto">
          {allNotification.notifications?.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() =>
                  deleteNotification(item._id, item.email, item.date, item.description)
                }
                className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-200 hover:cursor-pointer"
              >
                <p className="text-[15px] font-satoshi font-bold">
                  {item?.description}
                </p>
                <p className="text-[15px] font-satoshi">{item?.email}</p>
                <p className="text-xs font-satoshi">
                  {(
                    item?.createdAt?.toString().split("T")[0] +
                    " " +
                    item?.createdAt?.toString().split("T")[1]
                  ).slice(0, 19)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;
