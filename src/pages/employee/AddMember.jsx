import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

export default function AddMember() {
  const navigate = useNavigate("");
  const [contact, setContact] = useState({ value: "" });
  const re = /^[0-9\b]+$/;
  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "" || re.test(value)) {
      setContact({ value });
    }
  };
  return (
    <div class="bg-[#F7F7F7] h-[80vh] py-5 px-5 ">
      <NavLink
        to={"/"}
        className="font-semibold text-[24px] leading-[29px] flex items-center"
      >
        {" "}
        <IoMdArrowBack size={25} className="mr-2" /> Add New Member
      </NavLink>

      <div class="bg-[#FFFFFF] border rounded-[10px] border-[#E4E4E4] mt-6 lg:py-10 lg:px-10">
        <div class="bg-[#F9FAFB] rounded-[10px] border border-[#E4E4E4] py-3 px-3 lg:py-10 lg:px-10">
          <div className="flex items-center">
            <div className="w-[60px] h-[60px] rounded-full border border-dashed border-[#0A8A33] flex items-center justify-center">
              <IoMdPerson color="#0A8A33" size={25} />
            </div>
            <label
              htmlFor="changeprofile"
              className="ml-3 font-semibold text-base underline cursor-pointer"
            >
              {" "}
              Upload Photo
            </label>
            <input type="file" className="hidden" id="changeprofile" />
          </div>
          <form onSubmit={(e)=>e.preventDefault()} >
            <div className="mt-5 lg:grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className=" mb-3">
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
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1 block w-full p-2.5 focus:outline-[#0A8A33]"
                  required
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
              <div className="mb-3 col-span-2 lg:col-span-1">
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
            </div>
            <div className="flex items-center gap-5 mt-5">
              <button
                onClick={() => navigate("/employee")}
                type="submit"
                className="text-white bg-[#0A8A33] rounded-lg w-[150px] h-[50px] px-5 py-2.5 text-center"
              >
                Save
              </button>
              <NavLink
                to={"/"}
                className="bg-[#F1F1F1] font-bold rounded-lg w-[150px] h-[50px] px-5 py-2.5 text-center"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
}
