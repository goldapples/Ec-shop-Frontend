import React from "react";
import {
  FaImages,
  FaSearch,
  FaDatabase,
  FaProductHunt,
  FaShoppingCart,
  FaArrowAltCircleDown,
  FaMoneyCheck,
  FaPaypal,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import axios from "axios";
import CartItem from "../../components/Cartitem ";
import { InboxIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { showNotification, getACart } from "../../redux/headerSlice";
import {
  FieldNumberOutlined,
  ApartmentOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
export default function Cart() {
  // for screen search (not in modal)
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [inventories, setInventories] = useState([]);
  const [transiction, setTransiction] = useState([]);

  useEffect(() => {
    setTransiction(inventories);
  }, [inventories]);

  const createTransaction = async () => {
    const date =  new Date()
    try {
      if (transiction.length === 0) {
        dispatch(
          showNotification({
            message: "Select product!",
            status: 0,
          })
        );
      } else {
        const res = await axios.post(
          process.env.REACT_APP_API_BASE_URL +
            "/api/inventory/inventory/transaction/addition",
         { transiction:transiction, date:date}
        );
        if (res.data.error) {
          dispatch(
            showNotification({
              message: res.data.message,
              status: 0,
            })
          );
        } else {
          dispatch(
            showNotification({
              message: res.data.message,
              status: 1,
            })
          );
          setInventories([]);
          dispatch(getACart());
        }
      }
    } catch {
      dispatch(
        showNotification({
          message: "Server is not running!",
          status: 0,
        })
      );
    }
    window.socket.emit("C2S_NEW_NOTIFICATION", {
      user: `${user?.lastName} ${user?.firstName}`,
      email: user?.email,
      date: date,
    });
  };


  useEffect(() => {
    getAllCart();
  }, []);
  const getAllCart = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/api/product/getAllCart"
      );
      if (res?.data.products) {
        setInventories(res?.data?.products);
      }
      if (res?.data.products === 0) {
        dispatch(
          showNotification({
            message: "No cart data",
            status: 2,
          })
        );
      }
    } catch {
      dispatch(
        showNotification({
          message: "Server is not running correctly!",
          status: 0,
        })
      );
    }
  };

  const [datas, setDatas] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [page, setPage] = useState(0);
  const [perpage, setPerpage] = useState(5);
  const [result, setResult] = useState([]);
  useEffect(() => {
    setResult(datas.slice(page, page + perpage));
  }, [datas, page, perpage]);

  const choose = (next) => {
    setPage(next);
  };

  const changePerpage = (value) => {
    setPerpage(value);
  };

  useEffect(() => {
    if (searchParam !== "") {
      setDatas(
        inventories.filter((card) => {
          return (
            card?.name?.toLowerCase().search(searchParam.toLowerCase()) !==
              -1 ||
            card?.category[0]?.title
              .toLowerCase()
              .search(searchParam.toLowerCase()) !== -1
          );
        })
      );
    } else {
      setDatas(inventories);
    }
  }, [searchParam, inventories]);

  return (
    <>
      <div className="bg-white rounded-md shadow-md px-[2rem] py-[2rem] mx-4 h-full">
        <div className="container mx-auto">
          <div className="w-full flex items-center mt-[40px] justify-between gap-20 ">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[24px] flex items-center font-bold text-minionBlue">
                  Total:
                  <span className="text-3xl text-minionRed">
                    {inventories.length}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-end items-start pr-6">
              <div className=" border border-minionBlue rounded-[10px] mr-6 px-2 flex justify-end items-center">
                <span
                  onClick={() => {
                    setSearchWord(searchRef.current.value);
                  }}
                  className="text-minionBlue hover:cursor-pointer pr-3"
                >
                  <FaSearch />
                </span>
                <input
                  type="search"
                  name=""
                  id=""
                  onChange={(e) => setSearchParam(e.target.value)}
                  className="outline-none bg-transparent p-2 w-[200px] text-minionBlue"
                  placeholder="Search..."
                />
              </div>

              <div className="flex">
                <button
                  onClick={() => {
                    createTransaction();
                  }}
                  className=" px-4 py-2 pl-2 border-minionBlue hover:text-minionBlue hover:bg-white border-[1px] hover:border-minionBlue font-sans rounded-md text-white bg-minionBlue duration-300 ease-out"
                >
                  <span className="flex items-center pl-2 gap-2 animate-pulse">
                    <FaShoppingCart />
                    Buy
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full p-2 pb-6 bg-base-100  mt-2">
            <div className=" mt-2"></div>

            {/** Card Body */}
            <div className=" w-full  bg-base-100 ">
              <div className=" h-[600px] overflow-y-auto pr-4">
                <table className=" w-full">
                  <thead className="bg-[#c6edff] pt-6 m-2">
                    <tr className="py-4">
                      <th className="py-4  pt-6 px-4 pl-4 text-minionBlue text-xl">
                        <FieldNumberOutlined style={{ fontSize: "24px" }} />
                      </th>
                      <th className="py-4  pt-6 px-4 pl-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <FaImages />
                          Thumbnail
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <FaProductHunt />
                          Name
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <ApartmentOutlined />
                          Category
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <FaMoneyCheck />
                          Price
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <FaArrowAltCircleDown />
                          Discount
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <FaDatabase />
                          Amount
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <FaPaypal />
                          Pay
                        </span>
                      </th>
                      <th className="py-4 pt-6  px-4 text-minionBlue text-xl">
                        <span className="flex justify-center items-center gap-2">
                          <ControlOutlined />
                          Option
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {result?.map((data, index) => {
                      return (
                        <CartItem
                          key={index}
                          index={index}
                          page={page}
                          data={data}
                          refresh={getAllCart}
                          setTransiction={setTransiction}
                          transiction={transiction}
                        />
                      );
                    })}
                  </tbody>
                </table>
                {result.length ? (
                  ""
                ) : (
                  <div className="w-full flex flex-col justify-center items-center py-20">
                    <InboxIcon className="w-20 opacity-[0.7] py-3" />
                    <span className=" text-xl opacity-[0.7]">
                      No inventory found!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-[5px]">
            <Pagination
              total={inventories.length}
              page={page}
              perpage={perpage}
              choose={choose}
              setPerpage={changePerpage}
              initialPage={[5, 10, 50]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
