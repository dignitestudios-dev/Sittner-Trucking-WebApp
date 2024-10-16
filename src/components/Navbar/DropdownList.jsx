import React, { useContext, useRef } from 'react'
import { MyContext } from '../../context/GlobalContext';

export default function DropdownList() {
    const { IsDropdownOpen, setIsDropdown } = useContext(MyContext)
    const DropdownRef = useRef(null);
    const toggleModal = () => {
        setIsDropdown(!IsDropdownOpen);
    };
    return (
        <>
            {
                IsDropdownOpen && (
                    <div
                        onClick={toggleModal}
                        style={{ position: 'fixed', top: '0px',}}
                        className={` h-[350px]   transition-all duration-500  ${IsDropdownOpen ? "opacity-1 translate-y-11" : "opacity-0 translate-y-8"
                            } lg:static  px-3 w-[300px] md:w-[400px] flex flex-col right-[7px] lg:right-[40px] gap-3 items-center justify-start py-0  `}
                    >
                        <div
                            ref={DropdownRef}
                            className={`fixed top-0 right-0 transition-all shadow-xl duration-200  ${IsDropdownOpen ? "opacity-1 translate-y-8" : "opacity-0 translate-y-8"
                                } lg:static w-[100%] overflow-auto  scroll-box gap-3 rounded-[16px] px-5 py-5 h-full bg-[#FFFFFF]`}
                        >
                            <h3 className='text-base leading-[19px] font-bold' >Notifications</h3>

                            <ul className="max-w-md mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="pb-3 sm:pb-4 border-b border-[#F4F4F4]">
                                    <div className="flex  space-x-4 rtl:space-x-reverse">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold  ">
                                                New Message from Admin
                                            </p>
                                            <p className="text-[13px] text-[#909090] font-normal">
                                                Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.                                 </p>
                                        </div>
                                        <div className='flex flex-col items-end'>
                                            <p className='text-xs text-[#717171] font-medium' >7:30 PM</p>
                                            <div className="inline-flex items-center justify-end text-base font-semibold text-gray-900 dark:text-white">
                                                <span className="">
                                                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-[#EF5151] text-white">
                                                        6
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </ul>



                        </div>
                    </div>
                )
            }
        </>



    )
}
