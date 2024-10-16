import React, { useContext, useState } from 'react'
import { FaChevronUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../context/GlobalContext';
export default function Member() {
    const [openIndex, setOpenIndex] = useState(null);
    const {LookScreen,setIsAddMem,AddMem}=useContext(MyContext);
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const user = [
        {
            title: "Adam Gilchrist",
            img: "/large-person-4.png"
        },
        {
            title: "Mike Tyson",
            img: "/large-person-3.png"
        },
        {
            title: "Andrew Garfield",
            img: "/large-person-2.png"
        },
        {
            title: "John Cena",
            img: "/large-person-1.png"
        },

    ] 
    
     const color=[
        "bg-[#B9FF9E]",
        "bg-[#FFD839]",
        "bg-[#E8F569]",
        "bg-[#94D0E4]",
        
     ]
        
    return (
        <div>
            <div
                id="accordion-collapse"
                data-accordion="collapse"
                className={`${LookScreen?"w-[40%]":"w-full"}  mt-2 mx-auto`}
            >
                <div
                    type="button"
                    className={`flex flex-col items-start justify-between w-full py-4 font-medium rtl:text-right outline-none hover:opacity-95 `}
                    data-accordion-target="#accordion-collapse-body-1"
                >
                    <button
                        name="faq-question"
                        type="button"
                        className={`flex border-b border-[#F2F2F2] pb-2  items-center justify-between w-full  font-medium rtl:text-right  outline-none hover:opacity-95  gap-3`}
                        onClick={() => handleToggle(1)}
                    >
                        <div
                            className={`w-auto flex justify-start items-center text-xs md:text-sm lg:text-xl text-left gap-2 `}
                        >
                            <h2
                                className={`font-medium text-[13px]`}
                            >
                                Members
                            </h2>
                        </div>
                        {
                         !LookScreen&&(                        
                         openIndex === 1 ? (
                            <FaAngleDown className="text-xl" />
                        ) : (
                            <FaChevronUp className="text-xl" />
                        )
                    
                ) }
                    </button>

                    <div
                        id="accordion-1"
                        className={`transition-all w-full duration-200 ${!openIndex == 1 ? "" : "hidden"
                            }`}
                    >
                        <div className="py-1 w-full rounded-md mt-1 ">
                            <NavLink onClick={()=>setIsAddMem(true)} className='bg-transparent mt-2 mb-2 ' ><img src="/addmember.png" width={150} alt="" srcset="" /></NavLink>
                            <ul className="w-full h-[363px] scroll-box overflow-auto ">
                                {
                                    user.map((item, i) => (
                                        <li className="mt-3 ">
                                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                <div className={`w-[50px] h-[50px]  rounded-full ${color[i]} `}>
                                                    <img
                                                        className='object-contain w-full  h-full'
                                                        src={item.img}
                                                        alt={item.img}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-medium  ">
                                                        {item.title}
                                                    </p>
                                                </div>

                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
