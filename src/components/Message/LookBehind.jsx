import React from "react";

export default function LookBehind({deliveredNotifications}) {
  return (
    <div className=" mt-3 h-[80%] scroll-box px-3  overflow-auto">

      
      {deliveredNotifications && deliveredNotifications.length > 0 ? (
      deliveredNotifications.map((item,i)=>(
        <div className="look-behind   px-3 py-5 w-[100%]" key={i} >
        <div className="username mb-3">
          <h2 className="font-semibold text-sm leading-[14px] "> {new Date(item.date).toLocaleDateString("en-US", {
                weekday: "long",
              })}</h2>
        </div>
        <div className="w-full py-2 px-2 bg-[#F9F9F9] border border-[#DFDFDF] rounded-[10px]">
          <h3 className="font-semibold text-sm leading-[14px]">Day 1</h3>
          <div className=" w-full rounded-2xl mt-2 text-xs font-normal">
          {item.message}
          </div>
          <span className="text-[12px] font-normal text-[#5C5C5C]">
          {item.date}
          </span>
          <span className="text-[12px] ml-2 font-normal text-[#5C5C5C]">
          {item.time}
          </span>
        </div>
      </div>
      ))  )    
      : (
        <div className="no-data-message text-center py-5">
          <p className="text-sm text-gray-500">No Look Behind available.</p>
        </div>
      )}
      
    </div>
  );
}
