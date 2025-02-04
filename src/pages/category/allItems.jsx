import React from "react";
import { FaPlus, FaFilter,FaSearch, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";

import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryItem from "./categoryItem";
import { InboxIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/headerSlice";

export default function AllItems() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [delButton, setDelButton] = useState(true);
  const [delCat, setDelCat] = useState(false);
  const [noCategory, setNoCategory] = useState("");
  const [datas, setDatas] = useState([]);
  // for  screen search  (not in modal)
  const [searchParam, setSearchParam] = useState("");
  const [page, setPage] = useState(0);
  const [perpage, setPerpage] = useState(7);
  const [result, setResult] = useState([]);
  const [checkedController, setCheckedController] = useState(false);
  let del = [];

  useEffect(() => {
    getAllcategories();
  }, []);

  const getAllcategories = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/api/user/getallcategories"
      );
      if (res.data.categories.length === 0) {
        setNoCategory("No category found!");
        dispatch(
          showNotification({
            message: "No category found!",
            status: 2,
          })
        );
      }
      setCategories(
        res.data.categories.map((item) => {
          return { ...item, checked: false };
        })
      );
    } catch {
      dispatch(
        showNotification({
          message: "Server is not running correctly!",
          status: 0,
        })
      );
    }
  };

  // total history cost

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
        categories.filter((card) => {
          return (
            card.title.toLowerCase().search(searchParam.toLowerCase()) !== -1 ||
            card.description.toLowerCase().search(searchParam.toLowerCase()) !==
              -1
          );
        })
      );
      setPage(0);
    } else {
      setDatas(categories);
    }
  }, [searchParam, categories]);

  const changeCheckValue = (id) => {
    setCategories(
      categories.map((item) => {
        if (item._id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
    setCheckedController(false);
  };

  const selectDel = () => {
    setDelButton(false);
    setDelCat(true);
  };

  const cancelDel = () => {
    setDelButton(true);
    setDelCat(false);
  };

  const confirmDel = async () => {
    categories.map((item) => {
      if (item.checked == true) {
        del.push(item._id);
      }
    });
    const delCategories = {
      data: del,
    };

    if (delCategories.data.length === 0) {
      dispatch(showNotification({ message: "Select category!", status: 2 }));
    }

    try {
      const res = await axios.put(
        process.env.REACT_APP_API_BASE_URL + "/api/user/multideletecategory",
        delCategories
      );
      dispatch(showNotification({ message: res.data.message, status: 1 }));

      setTimeout(() => {
        setPage(0);
        setCategories(res.data.categories);
        if (res.data.categories.length === 0) {
          setNoCategory("No category found!");
        }
      }, 1000);
    } catch {
      dispatch(
        showNotification({
          message: "Server is not running correctly!",
          status: 0,
        })
      );
    }
  };

  const checkCtr = (e) => {
    setCheckedController(!checkedController);

    if (!checkedController) {
      setCategories(
        categories.map((item, index) => {
          return { ...item, checked: true };
        })
      );
    } else {
      setCategories(
        categories.map((item, index) => {
          return { ...item, checked: false };
        })
      );
    }
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-md px-[2rem] py-[2rem] mx-4 h-full">
        <div className="container mx-auto">
          <div className="w-full flex justify-center mb-[40px]">
            <div>
              <div className="w-auto lg:w-[800px] xl:w-[986px] flex mt-[40px] flex-col md:flex-row justify-between gap-16 items-center">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[24px] text-minionBlue  font-bold">
                      Total: {categories.length}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    {delButton && (
                      <button
                        onClick={() => selectDel()}
                        className="flex items-center gap-1 px-4 py-2 hover:text-minionRed hover:bg-white border-[1px] hover:border-minionRed font-sans  rounded-md mx-2 text-white bg-minionRed duration-300 ease-out"
                      >
                        <FaTrash /> Delete
                      </button>
                    )}
                    {delCat && (
                      <div className="flex items-center">
                        <button
                          onClick={() => confirmDel()}
                          className="flex items-center gap-1 px-4 py-2 hover:text-minionRed hover:bg-white border-[1px] hover:border-minionRed font-sans  rounded-md mx-2 text-white bg-minionRed duration-300 ease-out"
                        >
                          <FaTrash /> Delete
                        </button>
                        <button
                          onClick={() => cancelDel()}
                          className="flex items-center gap-1 px-4 py-2 hover:text-minionBlue hover:bg-white border-[1px] hover:border-minionBlue font-sans  rounded-md mx-2 text-white bg-minionBlue duration-300 ease-out"
                        >
                          <FaTrash /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  
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
                  <div className="flex justify-between items-center">
                    <Link
                      to={"addition"}
                      className="flex items-center gap-1 px-4 py-2 hover:text-minionBlue hover:bg-white border-[1px] hover:border-minionBlue font-sans  rounded-md mx-2 text-white bg-minionBlue duration-300 ease-out"
                      replace={true}
                    >
                      <FaPlus /> Add New
                    </Link>
                  </div>
                </div>
              </div>

              {/** Card Body */}
              <div className="mt-6 h-[540px] overflow-x-auto w-[80vw] md:w-full px-4">
                <table className=" w-full relative">
                  <thead className="w-full top-[29%]  bg-[#c6edff] ">
                    <tr className="">
                      <th className="pt-6 py-4 px-10 text-minionBlue  text-xl">
                        No
                      </th>
                      {delCat && (
                        <th className="pt-6 px-2 py-4 pl-[10px] text-minionBlue text-xl">
                          <input
                            type="checkbox"
                            className="pt-6 cursor-pointer duration-1000"
                            name=""
                            id=""
                            checked={checkedController}
                            onChange={() => checkCtr()}
                          />
                        </th>
                      )}
                      <th className="pt-6 py-4 px-4 text-minionBlue text-xl">
                        Title
                      </th>
                      <th className="pt-6 py-4 text-minionBlue text-xl">
                        Description
                      </th>
                      <th className="pt-6 py-4 px-10 text-minionBlue text-xl">
                        Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" ">
                    {result.map((data, index) => {
                      return (
                        <CategoryItem
                          key={index}
                          index={index}
                          page={page}
                          data={data}
                          changeCheckValue={changeCheckValue}
                          delCat={delCat}
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
                    <span className=" text-xl opacity-[0.7]">{noCategory}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end pb-[30px] pt-[5px] pr-[40px]">
                <Pagination
                  total={categories.length}
                  page={page}
                  perpage={perpage}
                  choose={choose}
                  setPerpage={changePerpage}
                  initialPage={[7]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
