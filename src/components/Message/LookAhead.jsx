import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MyContext } from "../../context/GlobalContext";
export default function LookAhead() {
  const { token } = useContext(MyContext);
  return (
    <div className=" mt-3 h-[100%] scroll-box  px-3 overflow-auto">
      {token == "admin" && (
        <NavLink
          to={"/createlook"}
          className={`flex text-sm w-[203px] font-semibold text-center bg-[#0A8A33] text-white h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 mx-5 py-2 `}
        >
          {" "}
          <FaPlus className="mr-2 text-sm" /> Create New Message
        </NavLink>
      )}
      <div className="look-ahead   px-3 py-5 w-[100%]">
        <div className="username mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-sm leading-[14px] ">Monday</h2>
          {token == "admin" && (
            <NavLink to={"/editlook"} className="bg-transparent">
              <img src="/whiteedit.png" className="w-5" alt="" srcset="" />
            </NavLink>
          )}
        </div>
        <div className="w-full py-2 px-2 bg-[#F9F9F9] border border-[#DFDFDF] rounded-[10px]">
          <h3 className="font-semibold text-sm leading-[14px]">Day 1</h3>
          <div className=" w-full rounded-2xl mt-2 text-xs font-normal">
            Lorem ipsum dolor sit amet consectetur. Tellus ornare viverra arcu
            at gravida sed.{" "}
          </div>
          <span className="text-[12px] font-normal text-[#5C5C5C]">
            20-08-2024
          </span>
          <span className="text-[12px] ml-2 font-normal text-[#5C5C5C]">
            09:00 AM
          </span>
        </div>
      </div>
    </div>
  );
}
