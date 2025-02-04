import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import MyInfo from "./components/MyInfo";
import CoinCharge from "./components/CoinCharge";
import Favorite from "./components/Favorite";
import FavoriteArticle from "./components/FavoriteArticle";
import ProductHistory from "./components/ProductHistory";
import AddArticleHistory from "./components/AddArticleHistory";
import { showNotification } from "../../redux/headerSlice";
import axios from "axios";

const { RangePicker } = DatePicker;
const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];
const currentDate = new Date();
const dateNumber = dayjs(currentDate).daysInMonth();
const initialDate = [dayjs().date(1), dayjs().date(dateNumber)];

const MyAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [allInfo, setAllInfo] = useState();
  const [newMonthDate, setNewMonthDate] = useState(initialDate);
  const accountAllInfo = async () => {
    const res = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/user/userAccount/",
      {
        sDate: newMonthDate[0].format("YYYY-MM-DD"),
        eDate: newMonthDate[1].format("YYYY-MM-DD"),
      }
    );
    setAllInfo(res?.data);
  };

  useEffect(() => {
    accountAllInfo();
  }, [newMonthDate]);

  const handleDatePickerValueChange = (newValue) => {
    setNewMonthDate([moment(newValue[0])._i, moment(newValue[1])._i]);
    dispatch(
      showNotification({
        message: `Period from ${moment(newValue[0])._i.format(
          "YYYY-MM-DD"
        )} to ${moment(newValue[1])._i.format("YYYY-MM-DD")} `,
        status: 1,
      })
    );
  };

  return (
    <>
      <div className="rounded-xl  font-satoshi px-4  sm:px-8 mt-2 mx-0 sm:mx-4 min-h-full ">
        <div className=" container  gap-6 w-full mx-auto flex justify-between xl:flex-row xm:flex-col-reverse ">
          <div className="w-[50%] xl:w-[50%] xm:w-full">
            <MyInfo
              user={user}
              productNum={allInfo?.productHistory?.length}
              articleNum={allInfo?.articleHistory?.length}
            />
          </div>
          <div className="flex flex-col w-[50%] xl:w-[50%] xm:w-full">
            <div className="flex justify-between">
              <div></div>
              <RangePicker
                className=" rounded-lg bg-base-100 border-pink-500 h-10 mt-4 w-[45%] xxl:w-[35%] xl:w-[45%] sm:w-[60%] xm:w-[80%] "
                defaultValue={newMonthDate}
                presets={rangePresets}
                allowClear={false}
                onChange={handleDatePickerValueChange}
              />
            </div>
            <CoinCharge coin={user?.money} userInfo={user} />
          </div>
        </div>

        <div className="container mx-auto flex gap-4 mt-4 xl:flex-row xm:flex-col">
          <div className=" w-[33%] xl:w-[33%] xm:w-full">
            <Favorite
              userAvatar={user?.avatar}
              showData={allInfo?.favoriteProduct}
            />
          </div>
          <div className=" w-[66%] xl:w-[66%] xm:w-full">
            <ProductHistory
              showData={allInfo?.productHistory}
              total={allInfo?.productTotal}
              userAvatar={user?.avatar}
            />
          </div>
        </div>

        <div className="container mx-auto flex gap-4 mt-4 xl:flex-row xm:flex-col">
          <div className="w-[33%] xl:w-[33%] xm:w-full">
            <FavoriteArticle
              userAvatar={user?.avatar}
              showData={allInfo?.reviewArticle}
            />
          </div>
          <div className=" w-[66%] xl:w-[66%] xm:w-full">
            <AddArticleHistory
              showData={allInfo?.articleHistory}
              userAvatar={user?.avatar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MyAccount;
