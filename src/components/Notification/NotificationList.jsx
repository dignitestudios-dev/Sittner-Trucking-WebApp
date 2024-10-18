import React from "react";
import { NavLink } from "react-router-dom";

export default function NotificationList() {
  return (
    <div className="bg-[#FFFFFF] border rounded-[10px] border-[#E4E4E4] mt-6 px-3 py-3 lg:py-5 lg:px-5">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#787F8C] uppercase bg-[#F3F5F7]">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Status
              </th>
              <th scope="col" className="px-6 py-3  rounded-e-lg">
                <span className="flex xl:hidden">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white  border-b-2 border-[#F4F4F4]  ">
              <th
                scope="row"
                className="px-6 py-10  text-gray-900 whitespace-nowrap text-base font-normal"
              >
                Lorem ipsum dolor
              </th>
              <td className="px-6 py-10 text-[#18181880]  text-base font-normal">
                <p className="sm:w-[200px] overflow-auto text-nowrap lg:text-wrap lg:w-[550px]">
                  Lorem ipsum dolor sit amet consectetur. In volutpat et mattis
                  ut tristique viverra blandit. Cras sem egestas praesent enim
                  elementum dolor arcu. Cras sem egestas praesent enim elementum
                  dolor arcu.
                </p>
              </td>
              <td className="px-6 py-10">
                <div className="bg-[#FF99001F] w-[100px] text-center text-[#FF9900] text-xs font-bold me-2 px-4 py-2 rounded-full  ">
                  Scheduled
                </div>
              </td>
              <td className="px-6 py-10">
                <NavLink to={"/editnotification"} className="bg-transparent">
                  <img
                    src="/whiteedit.png"
                    className="w-5 lg:w-5"
                    alt=""
                    srcset=""
                  />
                </NavLink>
              </td>
            </tr>
            <tr className="bg-white border-b-2 border-[#F4F4F4]">
              <th
                scope="row"
                className="px-6 py-10  text-gray-900 whitespace-nowrap text-base font-normal"
              >
                Lorem ipsum dolor
              </th>
              <td className="px-6 py-10 text-[#18181880] text-base font-normal">
                <p className="sm:w-[200px] overflow-auto text-nowrap lg:text-wrap lg:w-[550px]">
                  Lorem ipsum dolor sit amet consectetur. In volutpat et mattis
                  ut tristique viverra blandit. Cras sem egestas praesent enim
                  elementum dolor arcu. Cras sem egestas praesent enim elementum
                  dolor arcu.
                </p>
              </td>
              <td className="px-6 py-10">
                <div className="bg-[#41C54E26] w-[100px] text-center text-[#41C54E] text-xs font-bold me-2 px-4 py-2 rounded-full  ">
                  Delivered
                </div>
              </td>
              <td className="px-6 py-10">
                <button to={"/editnotification"} className="bg-transparent">
                  <img
                    src="/whiteedit.png"
                    className="w-5 lg:w-5"
                    alt=""
                    srcset=""
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
