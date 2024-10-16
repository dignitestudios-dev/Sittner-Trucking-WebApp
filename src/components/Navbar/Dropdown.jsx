import React, { useContext, useRef, useState } from 'react'
import { LuBell } from "react-icons/lu";
import { MyContext } from '../../context/GlobalContext';
export default function Dropdown() {
  const {setIsDropdown}=useContext(MyContext)
console.log(setIsDropdown);

  

  return (
    <>
        <button  
        onClick={() => setIsDropdown((prev) => !prev)}
        className=" w-[32px] h-[32px]  flex items-center justify-center mr-5 relative right-0 border-2 bg-[#F2F3F4] border-transparent text-gray-800 rounded-[8px] hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
<LuBell />
  <span className="absolute -inset-2 object-right-top -mr-8">
    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-[#EF5151] text-white">
      6
    </div>
  </span>
</button>
     

          </>
  
  
  )
}
