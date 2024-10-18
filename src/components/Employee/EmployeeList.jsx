import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EditEmp from "./editEmp";
import DeleteEmpProfile from "../Profile/DeleteProfile";

export default function EmployeeList() {
  const navgiate = useNavigate("");
  return (
    <div className="bg-[#FFFFFF] border rounded-[10px] h-[70vh] border-[#E4E4E4] mt-6 py-3 px-3 lg:py-5 lg:px-5">
      <div className="relative scroll-box overflow-x-auto h-full ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#787F8C] uppercase bg-[#F3F5F7]">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 ">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 ">
                Address
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <tr className="bg-white  border-b-2 border-[#F4F4F4]  ">
                <th
                  scope="row"
                  className="px-4 py-4  text-gray-900 whitespace-nowrap text-base font-normal"
                >
                  <div
                    onClick={() => navgiate("/profile")}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <div className="bg-[#94D0E4] w-[32px] h-[32px] rounded-full">
                      <img
                        src="/large-person-4.png"
                        alt=""
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-[13px] font-normal">Adam Gill</p>
                    </div>
                  </div>
                </th>
                <td className="px-6 text-[#181818] text-[13px] font-normal">
                  abc@gmail.com
                </td>
                <td className="px-6 text-[13px] font-normal text-[#181818]">
                  +1 856 558 0215
                </td>
                <td className="px-6 text-[13px] w-[200px] lg:w-auto font-normal text-[#181818]">
                  <p className="w-[200px] overflow-auto text-nowrap lg:w-auto">
                    House no. 42, Street 7, United States...
                  </p>
                </td>
                <td className="px-6 py-6">
                  <EditEmp />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteEmpProfile />
    </div>
  );
}
