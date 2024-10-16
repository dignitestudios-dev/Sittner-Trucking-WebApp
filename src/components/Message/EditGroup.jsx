import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
export default function EditGroup() {
  
   const {isEditGroup,setEditGroup}=useContext(MyContext);
    
  return (
    <>
      {isEditGroup ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[600px]  my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between pr-3 pt-3">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setEditGroup(false)}
                  >
                  <IoMdClose color="#858585" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6  flex flex-col items-center">                  
                 <h3 className="font-semibold text-[24px] leading-[29px] mb-3 capitalize" >Edit Group</h3>    
                   <label htmlFor="file" className="w-[88px] mb-3 h-[88px] text-center  relative cursor-pointer" >
                     <img src="/messageprofile.jfif" className="w-full h-full rounded-full" alt="" srcset="" />
                     <img src="/upload-img.png" className="absolute -right-2 bottom-0  w-8" alt="" srcset="" />
                     <input type="file" className="hidden" id="file" />
                     <button className="bg-transparent text-[#FF3B30] font-medium text-[15px] mt-2" >Remove</button>
                    </label>    

                     <div className="w-full mt-5" >
                        <form action="" className="w-full" >
                        <div className='mb-3' >
                            <label class=' text-[13px] mb-1 font-semibold leading-[16.94px] ' >Name</label>
                            <input type="text" id="base-input" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg h-[60px] mt-1  block w-full p-2.5 focus:outline-[#0A8A33]  " required  placeholder='JB Sittner Trucking LLC' />
                        </div>
                        <div>
                        <button type="submit" onClick={() => setEditGroup(false)} class="text-white bg-[#0A8A33]  rounded-lg  w-full mt-3 h-[50px]  px-5 py-2.5 text-center">Update</button>
                        </div>
                        </form>
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