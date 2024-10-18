import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { ModernTimePicker } from "../../components/Picker/TimePicker";
import DatePicker from "../../components/Picker/DatePicker";

export default function EditLookAhead() {
  const navigate = useNavigate("");
  return (
    <div class="bg-[#F7F7F7] h-[80vh] py-5 px-5 ">
      <NavLink
        to={"/"}
        className="font-semibold text-[24px] leading-[29px] flex items-center"
      >
        {" "}
        <IoMdArrowBack size={25} className="mr-2" /> Edit Message
      </NavLink>

      <div class="bg-[#FFFFFF] h-[100%] border rounded-[10px] border-[#E4E4E4] mt-6 lg:py-5 lg:px-5">
        <form onSubmit={(e)=>e.preventDefault()} >
          <div className="mt-5 grid grid-cols-1 gap-5  lg:grid-cols-2">
            <div className="mb-1 col-span-2">
              <textarea
                type="text"
                id="base-input"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-[12px] h-[127px] mt-1  block w-full p-2.5 focus:outline-[#0A8A33]  "
                placeholder="Type Here...."
              ></textarea>
            </div>
            <div className="mb-3 col-span-2">
              <label htmlFor="file">
                <div className="text-[#007AFF] flex items-center  cursor-pointer">
                  <FaPlus className="mr-2" /> Attachment
                </div>
                <input type="file" className="hidden" id="file" />
              </label>
            </div>
            <div className="mb-3 grid grid-cols-1  lg:grid-cols-2  col-span-1">
              <DatePicker />
              <ModernTimePicker />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-5">
            <button
              type="submit"
              onClick={() => navigate("/")}
              className="text-white bg-[#0A8A33]  rounded-lg  w-[150px] h-[50px]  px-5 py-2.5 text-center"
            >
              Save
            </button>
            <NavLink
              to={"/"}
              className="bg-[#F1F1F1] font-bold rounded-lg  w-[150px] h-[50px]  px-5 py-2.5 text-center"
            >
              Cancel
            </NavLink>
          </div>
        </form>

        <div></div>
      </div>
    </div>
  );
}
