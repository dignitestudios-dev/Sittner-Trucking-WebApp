import React, { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";

export default function EditMember() {
  const { token } = useContext(MyContext);
  const [contact, setContact] = useState({ value: "" });
  const navigate = useNavigate("");
  const re = /^[0-9\b]+$/;
  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "" || re.test(value)) {
      setContact({ value });
    }
  };
  return (
    <div class="bg-[#F7F7F7]  py-5 px-5 ">
      <NavLink
        to={"/"}
        className="font-semibold text-[24px] leading-[29px] flex items-center"
      >
        {" "}
        <IoMdArrowBack size={25} className="mr-2" /> Edit Employee Profile
      </NavLink>

      <div class="bg-[#FFFFFF] border rounded-[10px] border-[#E4E4E4] mt-6 lg:py-10 lg:px-10">
        <div class="bg-[#F9FAFB] rounded-[10px] border border-[#E4E4E4] py-3 px-3 lg:py-10 lg:px-10">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="bg-[#94D0E4] flex rounded-[50%] items-center justify-center  w-[58px] h-[58px]">
                <img
                  src="/large-person-3.png"
                  class="cursor-pointer w-[58px] h-[58px]"
                  alt=""
                />
              </div>
            </div>
            <label
              htmlFor="changeprofile"
              className="ml-3 font-semibold text-base underline cursor-pointer"
            >
              {" "}
              Change Photo
            </label>
            <input type="file" className="hidden" id="changeprofile" />
          </div>
          <form onSubmit={(e)=>e.preventDefault()} >
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="mb-3">
                <label className="text-[13px] mb-1 font-semibold leading-[16.94px]">
                  Name
                </label>
                <input
                  type="text"
                  id="name-input"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1 block w-full p-2.5 focus:outline-[#0A8A33]"
                  required
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-3">
                <label className="text-[13px] mb-1 font-semibold leading-[16.94px]">
                  Email
                </label>
                <input
                  type="email"
                  id="email-input"
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1 block w-full p-2.5 focus:outline-[#0A8A33] ${
                    token == "admin" ? "" : "cursor-not-allowed"
                  } `}
                  required
                  disabled={token == "admin" ? false : true}
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-3">
                <label className="text-[13px] mb-1 font-semibold leading-[16.94px]">
                  Contact No
                </label>
                <input
                  type="tel"
                  id="contact-input"
                  onChange={handleChange}
                  value={contact.value}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1 block w-full p-2.5 focus:outline-[#0A8A33]"
                  required
                  placeholder="Contact No"
                />
              </div>
              <div className="mb-3">
                <label className="text-[13px] mb-1 font-semibold leading-[16.94px]">
                  Address
                </label>
                <input
                  type="text"
                  id="address-input"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1 block w-full p-2.5 focus:outline-[#0A8A33]"
                  required
                  placeholder="Address"
                />
              </div>
              {token === "admin" && (
                <div className="mb-3">
                  <label className="text-[13px] mb-1 font-semibold leading-[16.94px]">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password-input"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1 block w-full p-2.5 focus:outline-[#0A8A33]"
                    required
                    placeholder="Password"
                  />
                </div>
              )}
            </div>
          </form>
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                token === "admin"
                  ? navigate("/employee")
                  : navigate("/profile");
              }}
              type="submit"
              className="text-white bg-[#0A8A33] rounded-lg w-[150px] h-[50px] px-5 py-2.5 text-center"
            >
              Update
            </button>
            <NavLink
              to={"/"}
              className="bg-[#F1F1F1] font-bold rounded-lg w-[150px] h-[50px] px-5 py-2.5 text-center"
            >
              Cancel
            </NavLink>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
