import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/userSlice";
import { getACart } from "../redux/headerSlice";
import { FaShoppingCart, FaHouseUser } from "react-icons/fa";
import Notification from "../components/DropdownNotification";
import CoinCharge from "../components/DropdownCoinCharge";
import defaultAvatarURL from "../assets/image/avatar.png";

// import fa icon
import { FaEdit, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { user, token } = useSelector((store) => store.user);
  const { count } = useSelector((store) => store.header);

  const [avatarURL, setAvatarURL] = useState(defaultAvatarURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.avatar[0]) {
      setAvatarURL(
        `${
          process.env.REACT_APP_API_BASE_URL +
          "/api/file/download/" +
          user?.avatar
        }`
      );
    }
  }, [user?.avatar[0]]);
  const logOutUser = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const logInUser = () => {
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  ``;
  // for admin navbar

  const adminName = user?.name || "gru";

  const trigger = useRef(null);
  const menu = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!menu.current) return;
      if (
        !menuOpen ||
        menu.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMenuOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!menuOpen || keyCode !== 27) return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    dispatch(getACart());
  }, []);

  return (
    // normal user navbar
    <>
      <div className="relative z-[99999] w-full max-w-[1920px] text-[18px] font-times bg-white opacity-90 flex justify-end items-center h-20 shadow-md px-10 sm:px-10 md:px-12 lg:px-16 xl:px-36 duration-500">
        <div className="relative flex items-center gap-4 xl:gap-10">
          <ul className=" items-center flex md:flex gap-4 xl:gap-6">
            <li className="text-minionBlue text-2xl p-2 bg-minionLightBlue rounded-full">
              <CoinCharge />
            </li>
            {user?.role === "user" ? (
              <li className="relative">
                <Link to={"/app/product/cart"}>
                  <FaShoppingCart className="w-7 h-7 text-minionBlue" />
                </Link>
                {count !== 0 ? (
                  <span className="absolute -top-0.5 right-[-4px] h-4  w-4 rounded-full animate-bounce bg-meta-1 bg-minionRed">
                    <span className=" absolute -top-0.5 right-0 font-impact inline-flex justify-center m-[1px] h-full w-full text-[12px] text-[#ffffff] rounded-full ">
                      {count}
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </li>
            ) : (
              ""
            )}

            <li className="z-[9999]">
              <Notification />
            </li>
            <li>
              <Link
                to="/about"
                className="global-link text-minionBlue font-impact font-normal"
              >
                About
              </Link>
            </li>
            <li
              ref={trigger}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="text-minionBlue font-impact font-normal text-xl">
                {user?.firstName}
              </span>
              <img
                src={avatarURL}
                alt="avatar"
                className="w-12 h-12 border border-white rounded-full"
              />
            </li>
          </ul>
          {/*----------------- user menu */}
          <ul
            ref={menu}
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            className={`absolute  overflow-hidden border-[1px] duration-300 border-minionBlue rounded-md bg-white z-50 top-[55px] right-[-8px]  ${
              menuOpen === false ? "h-[0] py-0 border-none" : ""
            }`}
          >
            <li>
              <Link
                to="/app/profile"
                className="flex items-center gap-1 rounded-tr-lg rounded-tl-lg hover:text-white hover:bg-minionBlue text-minionBlue text-lg px-4 py-2 duration-300 ease-linear"
              >
                <FaEdit></FaEdit>Profile
              </Link>
            </li>
            <li>
              {user?.role != "admin" && (
                <Link
                  to="/app/account"
                  className="flex items-center gap-1 rounded-tr-lg rounded-tl-lg hover:text-white hover:bg-minionBlue text-minionBlue text-lg px-4 py-2 duration-300 ease-linear"
                >
                  <FaHouseUser></FaHouseUser>My Account
                </Link>
              )}
            </li>
            <li>
              {token === null ? (
                <button
                  onClick={() => {
                    logInUser();
                  }}
                  className="flex items-center gap-1  rounded-br-lg rounded-bl-lg hover:text-white hover:bg-minionBlue text-minionBlue text-lg px-4 py-2 duration-300 ease-linear"
                >
                  <FaSignInAlt></FaSignInAlt> LogIn
                </button>
              ) : (
                <button
                  onClick={() => {
                    logOutUser();
                  }}
                  className="flex items-center gap-1 w-full  rounded-br-lg rounded-bl-lg hover:text-white hover:bg-minionBlue text-minionBlue text-xl px-4 py-2 duration-300 ease-linear"
                >
                  <FaSignOutAlt></FaSignOutAlt> Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
