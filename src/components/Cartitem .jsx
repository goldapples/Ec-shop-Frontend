import { FaTrash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { getACart } from "../redux/headerSlice";
import { useDispatch } from "react-redux";

import defaultAvatar from "../assets/image/feature-img.png";
const CartItem = ({
  index,
  page,
  data,
  refresh,
  transiction,
  setTransiction,
}) => {
  const [quantity, setQuantity] = useState(data?.quantity);
  const searchRef = useRef();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const initSearch = () => {
    setQuantity(1);
    setFlag(false);
  };
  useEffect(() => {
    setTotalPrice(
      ((data?.price + data?.price * 0.1 - data.discount) * quantity).toFixed(1)
    );
  }, [quantity]);

  const selectDel = async (id) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_BASE_URL + "/api/product/cartdelete/" + id
      );
      dispatch(getACart());
      refresh();
      // setState(!state);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className="hover:bg-[#d7f2ff] duration-150 ease-linear border-b-[1px] border-b-[#eaf8ff] even:bg-[#eaf8ff]">
      <td className="text-center py-6 ">{index + 1 + page}</td>
      <td className="text-center pt-2 flex flex-row items-center justify-center">
        <div className="w-[48px] h-[48px] object-center border border-white rounded-full">
          <img
            src={
              data?.files[0]
                ? process.env.REACT_APP_API_BASE_URL +
                  "/api/file/download/" +
                  data?.files[0]
                : defaultAvatar
            }
            alt=""
            className="w-full h-full  rounded-full"
          />
        </div>
      </td>
      <td className="text-center py-6 ">{data?.title}</td>
      <td className="text-center py-6 ">{data?.category[0]}</td>
      <td className="text-center py-6 ">${data?.price + data?.price * 0.1}</td>
      <td className="text-center py-6 ">${data?.discount}</td>

      <td className="py-6 flex justify-center  text-minionBlack text-lg">
        <div className="border w-[100px] text-center  border-minionBlue rounded-[10px] py-1 px-2 flex items-center">
          <input
            type="number"
            ref={searchRef}
            min={0}
            name=""
            id=""
            value={quantity}
            onChange={(e) => {
              e.target.value ? setFlag(true) : setFlag(false);
              setQuantity(searchRef.current.value);
              setTransiction(
                transiction.map((val, key) => {
                  return val.id == data.id
                    ? {
                        ...val,
                        quantity: Number(e.target.value),
                      }
                    : val;
                })
              );
            }}
            className="outline-none  bg-transparent w-full text-minionBlue"
          />
          <span
            id="more"
            onClick={(e) => {
              initSearch(e.target.id);
            }}
            className={`text-xl  text-minionBlue ${
              flag === true ? `visible hover:cursor-pointer` : "invisible "
            }`}
          >
            x
          </span>
        </div>
      </td>
      <td className="text-center py-6 ">
        $
        {((data?.price + data?.price * 0.1 - data.discount) * quantity).toFixed(
          1
        )}
      </td>
      <td>
        <div className=" flex justify-center m-auto ">
          <button
            onClick={() => selectDel(data?.id)}
            className="flex items-center gap-1 px-4 py-2 hover:text-minionRed hover:bg-white border-[1px] hover:border-minionRed font-sans  rounded-md mx-2 text-white bg-minionRed duration-300 ease-out"
          >
            <FaTrash /> Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
