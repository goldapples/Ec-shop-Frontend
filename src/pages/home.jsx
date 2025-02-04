import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaArrowCircleDown,
  FaRegArrowAltCircleDown,
  FaUserGraduate,
} from "react-icons/fa";
import {
  EyeIcon,
  HandThumbUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Category } from "../layout/Icons";
import ItemsArray from "./product/component/itemsArray";
import defaultPrdThumbnails from "../assets/image/feature-img.png";
import dayjs from "dayjs";
import Footer from "../components/Footer";
import MainView from "../components/MainView";
import { Rate, Modal, Button, Checkbox } from "antd";
import { CommentOutlined } from "@ant-design/icons";

export default function Home() {
  const { showSide } = useSelector((store) => store.side);
  const { user } = useSelector((store) => store.user);
  const [img, setImg] = useState(3);
  const [newProducts, setNewProducts] = useState();
  const currentDate = new Date();
  const dateNumber = dayjs(currentDate).daysInMonth();
  const initialDate = [dayjs().date(1), dayjs().date(dateNumber)];
  const [popularProducts, setPopularProducts] = useState();
  const threeDay = dayjs().add(-3, "d").$d;
  const [open, setOpen] = useState(false);
  const [bestUsers, setBestUsers] = useState();
  const [popularArticles, setPopularArticles] = useState();
  const [discountProducts, setDiscountProducts] = useState();

  const [del, setDel] = useState(false);

  const getNewProducts = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/api/home/newProducts"
    );
    const newProducts = res?.data?.newproduct;
    setNewProducts(newProducts);
  };
  useEffect(() => {
    getNewProducts();
  }, []);

  useEffect(() => {
    const getPopularProducts = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/api/home/popularProducts"
      );
      const popularProducts = res?.data?.popularProducts;
      setPopularProducts(popularProducts);
    };
    getPopularProducts();
  }, []);

  const getBestUsers = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/api/home/bestUsers"
    );
    const bestUsers = res?.data?.bestUsers;
    setBestUsers(bestUsers);
  };

  useEffect(() => {
    getBestUsers();
  }, []);

  const getPopularArticles = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/api/home/popularArticles"
    );
    const popularArticles = res?.data?.popularArticles;
    setPopularArticles(popularArticles);
  };

  useEffect(() => {
    getPopularArticles();
  }, []);

  const getDiscountProduct = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/api/home/discountProducts"
    );
    const discountProducts = res?.data?.discountProducts;
    setDiscountProducts(discountProducts);
  };
  useEffect(() => {
    getDiscountProduct();
  }, []);

  const plusSlides = (a) => {
    if (img + a < 1) {
      setImg(11);
    } else if (img + a > 11) {
      setImg(1);
    } else {
      setImg(img + a);
    }
  };

  const setHomeNotification = async (payload) => {
    setOpen(false);
    let param = user._id;
    if (del == true) {
      const res = await axios.put(
        process.env.REACT_APP_API_BASE_URL +
          "/api/home/setHomeNotification/" +
          param
      );
    }
  };

  const getHomeNotification = async () => {
    let param = user._id;
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL +
        "/api/home/getHomeNotification/" +
        param
    );
    const homenotification = res?.data?.notification?.homenotification;
    const nowDate = dayjs(new Date()).format("YYYY-MM-DD");
    const lastDate = dayjs(homenotification).format("YYYY-MM-DD");
    if (nowDate == lastDate) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    getHomeNotification();
  }, []);

  return (
    <>
      <Modal
        title=""
        className="homenotification"
        centered
        open={open}
        closeIcon
        onCancel={() => setOpen(false)}
        width={800}
        footer={[
          <div className="flex items-center justify-between">
            <Checkbox className="" onChange={() => setDel(!del)}>
              <p className="text-lg">don't display again</p>
            </Checkbox>
            <Button
              className="text-lg btn ml-2 px-6 btn-sm normal-case bg-red-50"
              onClick={() => setHomeNotification()}
            >
              Cancel
            </Button>
          </div>,
        ]}
      >
        <h2 className="text-black text-center text-2xl mx-2 pb-2 border-b-2 border-black ">
          Today's Notification
        </h2>
        <div className="p-2 mx-2 flex  items-center gap-3 border-black border-dotted border-b-2">
          <span className="text-black   text-xl">Discounted Products:</span>
          {discountProducts?.map((notification, index) => {
            return (
              <div key={index} className="text-2xl text-red-600 pt-3  pb-2   ">
                {notification.name}
              </div>
            );
          })}
          <span className="text-2xl text-red-600 pt-3  pb-2">.</span>
          <span className="text-2xl text-red-600 pt-3  pb-2">.</span>
          <span className="text-2xl text-red-600 pt-3  pb-2">.</span>
        </div>
        <div className="p-2 mx-2 flex  items-center gap-3 border-black border-dotted border-b-2">
          <span className=" text-red-600   text-2xl">
            {newProducts?.length}{" "}
            <span className="text-black">kinds of products added newly.</span>
          </span>
        </div>
      </Modal>

      <div className=" flex flex-col  ">
        <div className="pb-24">
          <MainView />
        </div>

        <div className="pb-24">
          <div className="text-minionBlue md:text-[40px] sm:text-[25px] xm:text-[20px] font-black  justify-center text-center  flex items-center animate-bounce lg:justify-start lg:pl-12 ">
            <span className="">
              <FaRegArrowAltCircleDown />
            </span>
            <span>Various and New Products</span>
            <span className="">
              <FaRegArrowAltCircleDown />
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6 px-6">
            <div className="col-span-2  shadow-md  pb-4 bg-white rounded-md">
              <div className="flex justify-between items-center pb-4 bg-pink-500 rounded-t-md">
                <h2 className=" text-2xl pt-6 pl-6 font-bold text-white flex items-center">
                  {/* <FaEyeDropper className="mr-2" /> */}
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="dropbox"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    className="mr-2"
                  >
                    <path d="M64 556.9l264.2 173.5L512.5 577 246.8 412.7zm896-290.3zm0 0L696.8 95 512.5 248.5l265.2 164.2L512.5 577l184.3 153.4L960 558.8 777.7 412.7zM513 609.8L328.2 763.3l-79.4-51.5v57.8L513 928l263.7-158.4v-57.8l-78.9 51.5zM328.2 95L64 265.1l182.8 147.6 265.7-164.2zM64 556.9z"></path>
                  </svg>
                  New Products
                </h2>
                <h2 className=" text-lg pt-6 pl-6 pr-6 text-white ">
                  {/* {showData?.length} */}
                </h2>
              </div>
              <div className="w-full h-fit  py-5  px-8 ">
                <ItemsArray result={newProducts} />
              </div>
            </div>

            <div className="col-span-1 shadow-md   bg-white rounded-md">
              <div className="flex justify-between items-center pb-4 bg-minionBlue rounded-t-md">
                <h2 className=" text-2xl pt-6 pl-6 font-bold text-white flex items-center">
                  <FaHeart className="pr-1" />
                  Popular Products
                </h2>
                <h2 className=" text-lg pt-6 pl-6 pr-6 text-white ">
                  {/* {showData?.length} */}
                </h2>
              </div>
              <div className=" bg-white    flex flex-col items-between overflow-y-auto  h-[450px]  py-4  px-2  gap-2">
                {popularProducts?.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white  border-dotted border-gray-300 border-b-2 flex flex-row justify-start "
                    >
                      <div className="w-[25%] h-full overflow-hidden  py-3 pr-1">
                        <Link
                          to={`/app/product/view/${product._id}`}
                          className="h-full rounded-sm overflow-hidden  w-full"
                        >
                          <img
                            src={
                              product.thumbnail.length
                                ? process.env.REACT_APP_API_BASE_URL +
                                  "/api/file/download/" +
                                  product.thumbnail[0]
                                : defaultPrdThumbnails
                            }
                            alt="productDetail"
                            className="w-full h-full rounded-md"
                          />
                        </Link>
                      </div>
                      <div className="py-2 text-gray-700 text-2xl font-semibold truncate flex  items-center justify-between  gap-6">
                        <div className="flex flex-col items-center">
                          {product.name}
                          <div className="text-lg text-gray-600 font-normal ">
                            {product?.description.slice(0, 15) + "..."}
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex justify-center items-center gap-2 text-minionBlue text-xl ">
                            <Rate
                              allowHalf
                              count={5}
                              value={product.rate}
                              disabled
                            />

                            {product?.review?.length !== undefined ? (
                              <span>
                                {" "}
                                <CommentOutlined /> {product?.review?.length}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <span className=" text-minionBlue bg-minionLightBlue px-4 py-1 rounded-full flex text-lg">
                            <Category /> {product?.category_product?.title}
                          </span>

                          <p className=" text-center text-xl flex items-center text-gray-700 font-normalmy-4">
                            Price: &nbsp; ${product.price + product.price * 0.1}
                            &nbsp;&nbsp;
                            {(product.discount * 100) /
                              (product.price + product.price * 0.1) !=
                            "0" ? (
                              <span className="text-white  text-2xl px-2 rounded-xl flex items-center justify-center gap-1 bg-[#ff8259] animate-bounce ">
                                <span className="text-xl">
                                  {" "}
                                  <FaArrowCircleDown></FaArrowCircleDown>
                                </span>
                                {((product.discount * 100) / product.price)
                                  .toString()
                                  .slice(0, 4) + "%"}
                              </span>
                            ) : (
                              <></>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1  px-6">
          <div className="text-minionBlue md:text-[40px] sm:text-[25px] xm:text-[20px] font-black  justify-center text-center  flex items-center animate-bounce lg:justify-start lg:pl-12">
            <span className="">
              <FaRegArrowAltCircleDown />
            </span>
            <span>Active Discussing Field</span>
            <span className="">
              <FaRegArrowAltCircleDown />
            </span>
          </div>
          <div className="grid grid-cols-1 xxl:flex xl:flex items-center gap-4">
            <div className="overflow-x-auto  xl:w-1/2">
              <div className="bg-white flex flex-col  w-full gap-6 shadow-md  xl:flex h-[450px]  rounded-xl min-w-[600px]">
                <div className="flex  justify-between items-center pb-4 bg-pink-500 rounded-t-md">
                  <h2 className=" text-2xl pt-6 pl-6 font-bold text-white flex items-center">
                    <FaUserGraduate className="mr-2" />
                    The Best Users
                  </h2>
                </div>
                <div className="flex flex-col flex-wrap px-4 w-full overflow-y-auto">
                  <table className=" overflow-y-scroll  min-w-[580px] overflow-x-auto ">
                    <thead className="border-b-[2px] border-gray-300 m-2 py-3">
                      {bestUsers?.length != 0 && (
                        <tr className="border-b-gray-300 py-12">
                          <th className=" px-4 text-gray-500 text-lg">No</th>
                          <th className=" px-4 text-gray-500 text-lg w-[30%]">
                            User
                          </th>
                          <th className=" px-4 text-gray-500 text-lg">
                            Num of Articles
                          </th>
                          <th className=" px-4 text-gray-500 text-lg">View</th>
                          <th className=" px-4 text-gray-500 text-lg">likes</th>
                          <th className=" px-4 text-gray-500 text-lg">
                            Contact
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody className=" ">
                      {bestUsers?.length ? (
                        ""
                      ) : (
                        <div className="w-full flex flex-col justify-center m-auto items-center py-20">
                          <InboxIcon className="w-20 opacity-[0.7] py-3" />
                          <span className=" text-xl opacity-[0.7]">
                            No category found!
                          </span>
                        </div>
                      )}
                      {bestUsers?.map((item, key) => {
                        return (
                          <tr
                            className="border-dotted border-gray-300 border-b-2 hover:bg-[#ddfaff] duration-300 ease-linear w-full h-2"
                            key={key}
                          >
                            <td className="text-center "> {key + 1}</td>
                            <td className="text-center flex flex-col items-center py-2">
                              <img
                                className=" w-10 h-10 rounded-full ml-4"
                                src={
                                  item?._id?.avatar?.length
                                    ? process.env.REACT_APP_API_BASE_URL +
                                      "/api/file/download/" +
                                      item?._id?.avatar[0]
                                    : "/image/avatar.png"
                                }
                              />
                              <p>
                                {" "}
                                {item?._id?.firstName}
                                {item?._id?.lastName}
                              </p>
                            </td>
                            {/* <td className="text-center "></td> */}
                            <td className="text-center ">
                              {" "}
                              {item?.articleNum}
                            </td>
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
                            <td className="text-center  mt-2 w-[25%]">
                              <div className="flex justify-center items-center">
                                <svg
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="message"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"
                                    className="w-5 h-5 mr-1"
                                  ></path>
                                </svg>
                                {item?._id?.email}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto  xl:w-1/2">
              <div className="bg-white flex flex-col  w-full gap-6 shadow-md  xl:flex h-[450px]  rounded-xl min-w-[600px]">
                <div className="flex  justify-between items-center pb-4 bg-minionBlue rounded-t-md">
                  <h2 className=" text-2xl pt-6 pl-6 font-bold text-white flex items-center">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="bank"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      className="mr-2"
                    >
                      <path d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 00-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM512 196.7l271.1 197.2H240.9L512 196.7zM264 462h117v374H264V462zm189 0h117v374H453V462zm307 374H642V462h118v374z"></path>
                    </svg>
                    The Popular Articles
                  </h2>
                </div>
                <div className="flex flex-col  px-4 w-full">
                  <table className=" w-full overflow-y-scroll  mt-2">
                    <thead className="border-b-[2px] border-gray-300 m-2">
                      {popularArticles?.length != 0 && (
                        <tr className="border-b-gray-300">
                          <th className=" px-4 text-gray-500 text-lg">No</th>
                          <th className=" px-4 text-gray-500 text-lg w-[30%]">
                            Title
                          </th>
                          <th className=" px-4 text-gray-500 text-lg">
                            Category
                          </th>
                          <th className=" px-4 text-gray-500 text-lg">View</th>
                          <th className=" px-4 text-gray-500 text-lg">likes</th>
                          <th className=" px-4 text-gray-500 text-lg">
                            Contact
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody className=" ">
                      {popularArticles?.length ? (
                        ""
                      ) : (
                        <div className="w-full flex flex-col justify-center m-auto items-center py-20">
                          <InboxIcon className="w-20 opacity-[0.7] py-3" />
                          <span className=" text-xl opacity-[0.7]">
                            No category found!
                          </span>
                        </div>
                      )}
                      {popularArticles?.map((item, key) => {
                        return (
                          <tr
                            className="border-dotted border-gray-300 border-b-2 hover:bg-[#ddfaff] duration-300 ease-linear w-full h-2"
                            key={key}
                          >
                            <td className="text-center "> {key + 1}</td>
                            <td className="text-center flex flex-col items-center py-2">
                              <Link to={`/app/article/${item?._id}`} key={key}>
                                {item?.title}
                              </Link>
                            </td>
                            <td className="text-center ">
                              {item?.categorytitle.title}
                            </td>
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
                                {item?.likes}
                              </div>
                            </td>
                            <td className="text-center  mt-2 w-[25%]">
                              <div className="flex justify-center items-center">
                                <svg
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="message"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"
                                    className="w-5 h-5 mr-1"
                                  ></path>
                                </svg>
                                {item?.userEmail[0]?.email}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
