import React, { useContext } from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineFilePresent } from "react-icons/md";
import { MyContext } from '../../context/GlobalContext';
export default function MessageBox() {
  const { LookScreen, setLookScreen, token, setIsMessageInfo, MessageInfo, viewImage, setIviewImage, setHideMsgGroup, setSideDraw } = useContext(MyContext);

  return (
    <div className='bg-[#FFFFFF] w-full h-[550px] relative rounded-[24px]' >
      {/* Message Head */}
      <div className="chathead px-5 py-5 border-b border-[#E1E1E1]">
        <div className='flex justify-between items-center ' >
          <div className='flex items-center'>
            <div>
              <img src="/messageprofile.jfif" class='rounded-[50%] object-cover cursor-pointer w-[50px] h-[50px] lg:w-[50px] lg:h-[50px]' alt="" />
            </div>
            <div className='ml-2 cursor-pointer ' onClick={() => token == "admin" && setLookScreen(!LookScreen)}>
              <h2 className='font-semibold text-base  lg:text-2xl leading-[29px]'  >JB Sittner Trucking LLC</h2>
              <p className='text-[#8A8A8A] text-[13px] font-normal' >50 members</p>
            </div>
          </div>
          <div className='ms-auto'>
            <button className='text-white bg-[#0A8A33] hover:bg-green-800  rounded-full text-sm p-2.5 text-center flex lg:hidden items-center' onClick={() => {              
              setSideDraw(true)
            }
              } ><MdOutlineFilePresent className='text-2xl' /></button>
          </div>
          <div>
          </div>
        </div>
      </div>
      {/* Message Body */}
      <div className={`chat-body ${token == "admin"?"h-[340px]":"h-[440px]"}  scroll-box  overflow-auto`}>
        {/* Day Timer */}
        <div className='flex justify-center py-2' >
          <span className='bg-[#F4F4F4] rounded-full px-2 py-1 text-xs font-normal' >Today</span>
        </div>
        {/* Messages */}
        <div className={`left-side ${token == "admin" && "ms-auto"} mb-3 px-3 py-3 w-auto lg:max-w-[30%]`} >
          {token == "user" && (
            <div className="username mb-3">
              <h2 className='font-semibold text-sm leading-[14px] ' >Admin</h2>
            </div>
          )}
          <div className='w-full py-2' >
            <div className={` ${token == "admin" ? "bg-[#0A8A33] text-white" : "bg-[#F4F4F4]"}   w-full rounded-2xl rounded-tr-none px-2 py-3 text-xs font-normal`} >labore et dolore magna aliqua.</div>
          </div>
          <div className='flex items-center gap-1 justify-end' >
            {token == "admin" && (
              <div className='flex items-center ' >
                <div className="msg-view bg-[#E8F569] w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full">
                  <img src="/person1.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#B9FF9E] rounded-full">
                  <img src="/person2.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#94D0E4] rounded-full">
                  <img src="/person3.png" className='w-full  h-full' alt="" srcset="" />
                </div>
                <img src="/tick-double.png" onClick={() => setIsMessageInfo(true)} className='w-5 cursor-pointer ml-1 ' alt="" />
              </div>
            )}
            <span className=' text-[10px] font-normal leading-[10px] text-[#797C7B]' >09:25 AM</span>
          </div>
        </div>
        <div className={`left-side ${token == "admin" && "ms-auto"} mb-3 px-3 py-3 w-auto lg:max-w-[30%]`} >
          {token == "user" && (
            <div className="username mb-3">
              <h2 className='font-semibold text-sm leading-[14px] ' >Admin</h2>
            </div>
          )}
          <div className='w-full py-2' >
            <div className='bg-[#F4F4F4] w-full flex justify-center rounded-2xl px-2 py-3  text-xs font-normal' >
              <img src="/chat-sms.png" className='cursor-pointer' onClick={() => setIviewImage(true)} alt="" srcset="" />
            </div>
          </div>
          <div className='flex items-center gap-1 justify-end' >
            {token == "admin" && (
              <div className='flex items-center ' >
                <div className="msg-view bg-[#E8F569] w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full">
                  <img src="/person1.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#B9FF9E] rounded-full">
                  <img src="/person2.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#94D0E4] rounded-full">
                  <img src="/person3.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <img src="/tick-double.png" onClick={() => setIsMessageInfo(true)} className='w-5 cursor-pointer ml-1 ' alt="" />
              </div>
            )}
            <span className=' text-[10px] font-normal leading-[10px] text-[#797C7B]' >09:25 AM</span>
          </div>

        </div>
        <div className={`left-side ${token == "admin" && "ms-auto"} mb-3 px-3 py-3 w-auto lg:max-w-[30%]`} >
          {token == "user" && (
            <div className="username mb-3">
              <h2 className='font-semibold text-sm leading-[14px] ' >Admin</h2>
            </div>
          )}
          <div className='w-full py-3 grid grid-cols-2  gap-2' >
            <div className='w-full rounded-xl flex justify-center px-2 py-2 bg-[#F4F4F4]   text-xs font-normal' >
              <img src="/xl.png" alt="" className='w-[50px] h-[50px]' srcset="" />
            </div>
            <div className='w-full rounded-xl px-2 flex justify-center py-2 bg-[#F4F4F4]   text-xs font-normal' >
              <img src="/pdf.png" alt="" className='w-[50px] h-[50px]' srcset="" />
            </div>

          </div>
          <div className='flex items-center gap-1 justify-end' >
            {token == "admin" && (
              <div className='flex items-center ' >
                <div className="msg-view bg-[#E8F569] w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full">
                  <img src="/person1.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#B9FF9E] rounded-full">
                  <img src="/person2.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#94D0E4] rounded-full">
                  <img src="/person3.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <img src="/tick-double.png" onClick={() => setIsMessageInfo(true)} className='w-5 cursor-pointer ml-1 ' alt="" />
              </div>
            )}
            <span className=' text-[10px] font-normal leading-[10px] text-[#797C7B]' >09:25 AM</span>
          </div>
        </div>
        <div className={`left-side ${token == "admin" && "ms-auto"} mb-3 px-3 py-3 w-auto lg:max-w-[30%]`} >
          {token == "user" && (
            <div className="username mb-3">
              <h2 className='font-semibold text-sm leading-[14px] ' >Admin</h2>
            </div>
          )}
          <div className='w-full py-2' >
            <div className={` ${token == "admin" ? "bg-[#0A8A33] text-white" : "bg-[#F4F4F4] text-[#007AFF]"}   w-full rounded-2xl rounded-tr-none px-2 py-3 text-xs font-normal`} >https://maps.google.com/</div>
          </div>
          <div className='flex items-center gap-1 justify-end' >
            {token == "admin" && (
              <div className='flex items-center ' >
                <div className="msg-view bg-[#E8F569] w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full">
                  <img src="/person1.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#B9FF9E] rounded-full">
                  <img src="/person2.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#94D0E4] rounded-full">
                  <img src="/person3.png" className='w-full h-full' alt="" srcset="" />
                </div>
                <img src="/tick-double.png" onClick={() => setIsMessageInfo(true)} className='w-5 cursor-pointer ml-1 ' alt="" />
              </div>
            )}
            <span className=' text-[10px] font-normal leading-[10px] text-[#797C7B]' >09:25 AM</span>
          </div>
        </div>
      </div>
      {/* Send Message */}
      {
        token == "admin"&&(
      <form className="w-100 bg-white lg:px-5 py-5 flex items-center absolute bottom-0 w-full  justify-center gap-8 ">
        <div className="relative w-[85%] h-[40px]">
          <div className="absolute inset-y-0 end-5 top-1 z-[9999]  flex items-center ">
            <label htmlFor="attach"  >
              <GrAttachment color='#000000' className='cursor-pointer' />
            </label>
            <input type="file" className='hidden' id='attach' />
          </div>
          <input
            type="text"
            id="email-address-icon"
            className="bg-[#FFFFFF] w-[100%] h-[100%] border border-[#CFCFCF] text-gray-900 text-sm rounded-2xl  block w-full p-2.5  focus:outline-[#0A8A33]"
            placeholder="Type Here"
          />
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-[#0A8A33] hover:bg-green-800   rounded-full text-sm p-2.5 text-center flex items-center  "
          >
            <RiSendPlaneFill className='lg:text-2xl' />

          </button>

        </div>
      </form>
 )
}
    </div>
  )
}

