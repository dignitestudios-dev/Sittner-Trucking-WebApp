import React, { useContext } from "react";
import { MyContext } from "../../context/GlobalContext";
import { IoMdClose } from "react-icons/io";
export default function ViewAllModal() {
    const {viewAll,setIsViewAll}=useContext(MyContext);
    const attachment=[
        {
            title:"Excel File.xls",
            img:"/bg-xl.webp"
        },
        {
            title:"Document File.pdf",
            img:"/bg-pdf.webp"
        },
        {
            title:"Important Picture.jpg",
            img:"/bg-jpg.webp"
        },
        {
            title:"Important Video.mp4",
            img:"/bg-mp4.webp"
        },
        {
            title:"Excel File.xls",
            img:"/bg-xl.webp"
        },
        {
            title:"Document File.pdf",
            img:"/bg-pdf.webp"
        },
        {
            title:"Important Picture.jpg",
            img:"/bg-jpg.webp"
        },
        {
            title:"Important Video.mp4",
            img:"/bg-mp4.webp"
        },
      
      ]   
    
    return (
        <>
            {viewAll ? (
                <>
                    <div
                        className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative h-[400px]  w-[350px]  my-6 mx-auto max-w-4xl">
                            {/*content*/}
                         
                            <div className="border-0 px-4 py-4 h-full  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex justify-between" >
                                <div>
                                    <h2 className="text-[18px] font-semibold leading-[21px]" >Attachments</h2>
                                </div>
                                <div>
                                <IoMdClose className="cursor-pointer" onClick={()=>setIsViewAll(false)} size={20} />
                                </div>
                            </div>
                                {/*body*/}
                                <div className="relative h-[90%] mt-4 scroll-box overflow-auto">
                                <div className="py-1 rounded-md  ">
                            <ul className="">
                                {
                                    attachment.map((item,i)=>(
                                        <li className="mt-3">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="flex-shrink-0 ">
                                                <img
                                                className='w-10 '
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
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );

}