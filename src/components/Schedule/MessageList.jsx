import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";

export default function MessageList() {
  const { DeleteSchedule, setIsDeleteSchedule } = useContext(MyContext);
  return (
    <div className="bg-[#FFFFFF] border rounded-[10px] border-[#E4E4E4] mt-6 py-3 px-3 lg:py-6  lg:px-10">
      <div className="flex mb-2 items-center justify-between border-b-2 py-4 border-[#F4F4F4]">
        <div className="msg w-[80%]  ">
          <p className="text-base font-normal text-[#18181880]">
            Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut
            tristique viverra blandit. Cras sem egestas praesent enim elementum
            dolor arcu. Cras sem egestas praesent enim elementum dolor arcu.
          </p>
          <div className="flex items-center mt-3 ">
            <span className="flex items-center text-[#5C5C5C] text-xs">
              <img src="/agenda.png" className="w-5 mr-2" alt="" srcset="" />
              10 Aug, 2024
            </span>
            <span className="flex items-center ml-3 text-[#5C5C5C] text-xs">
              <img src="/clock.png" className="w-5 mr-2" alt="" srcset="" />
              02:00 PM
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="bg-transparent"
            onClick={() => setIsDeleteSchedule(!DeleteSchedule)}
          >
            <img src="/trash.png" className="w-5" alt="" srcset="" />
          </button>
          <NavLink to={"/editschedule"} className="ml-2 bg-transparent ">
            <img src="/whiteedit.png" className="w-5" alt="" srcset="" />
          </NavLink>
        </div>
      </div>
      <div className="flex mb-2 items-center justify-between border-b-2 py-4 border-[#F4F4F4]">
        <div className="msg w-[80%]">
          <p className="text-base font-normal text-[#18181880]">
            Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut
            tristique viverra blandit. Cras sem egestas praesent enim elementum
            dolor arcu. Cras sem egestas praesent enim elementum dolor arcu.
          </p>
        </div>
        <div>
          <span class="bg-[#41C54E26] text-[#41C54E] text-xs font-medium me-2 px-4 py-2 rounded-full  ">
            Sent
          </span>
        </div>
      </div>
      <div className="flex items-center mb-2  justify-between border-b-2 py-4 border-[#F4F4F4]">
        <div className="msg w-[80%]">
          <div className="grid grid-cols-3 gap-2 lg:gap-0  lg:grid-cols-10">
            <div>
              <img src="/truck1.png" alt="" />
            </div>
            <div>
              <img src="/truck2.png" alt="" />
            </div>
            <div>
              <img src="/truck3.png" alt="" />
            </div>
          </div>
        </div>
        <div>
          <span className="bg-[#41C54E26] text-[#41C54E] text-xs font-medium me-2 px-4 py-2 rounded-full  ">
            Sent
          </span>
        </div>
      </div>
    </div>
  );
}
