import React, { useState } from 'react'
import LookBehind from './LookBehind'
import LookAhead from './LookAhead'

export default function Look() {
        const [IsBehind,setIsBehind]=useState(true);
    return (
        <div className='bg-[#FFFFFF] h-[630px]  rounded-[24px]'>
            <div className="flex items-center w-full mt-2 py-2 justify-evenly" >
                <button className={`flex text-xs w-[170px]  text-center ${IsBehind?"bg-[#0A8A33] text-white":"bg-[#F7F7F7] "}  h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
                    onClick={() => setIsBehind(true)}
                >Look Behind</button>
                <button className={`flex text-xs w-[170px]  text-center ${IsBehind?"bg-[#F7F7F7] ":"bg-[#0A8A33] text-white"} h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
                    onClick={() => setIsBehind(false)}
                >Look Ahead</button>
            </div>
             {
                IsBehind?(
                    <LookBehind />
                ):
                (
                    <LookAhead/> 
                )
             }

        </div>
    )
}
