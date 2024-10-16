import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";
import UpdatePasswordModal from "../Auth/UpdatePasswordModal";
import { MyContext } from "../../context/GlobalContext";
export default function PasswordUpdate() {
 const {ChangePassword,setIsChangePassword,setPasswordSuccessFullChange,PasswordSuccessFullChange}=useContext(MyContext);
  return (
    <>
      <button class='text-[#007AFF] mt-3 bg-transparent text-base font-medium flex items-center '
        onClick={() => setIsChangePassword(true)}
      >
        <MdLockOutline class='mr-2 font-bold' size={20} />
        Change Password
      </button>
      {ChangePassword ? (
        <>
          <div
            class="justify-center backdrop-blur-md  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div class="relative   my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div class="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-end pr-3 pt-3">

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsChangePassword(false)}
                  >
                    <IoMdClose color="#858585" />
                  </button>
                </div>
                {/*body*/}
                <div class="relative px-8 py-4  flex flex-col ">
                  <h3 className="font-bold text-[24px] leading-[29px] text-start mb-5" >Change Password</h3>
                  <form class="w-full mx-auto">
                    <div class="relative mb-3">
                      <input type="password" id="password" class="bg-white border border-[#CFCFCF] text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-[#0A8A33]" placeholder='Current password' required />
                      <p className="text-[#0E1014] text-base font-normal leading-[18px] mt-3">You must enter current password in order to change your password.</p>
                    </div>
                    <div class="relative mb-3">
                      <input type="password" id="password" class="bg-white border border-[#CFCFCF] text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-[#0A8A33]" placeholder='New Password' required />
                    </div>
                    <div class="relative mb-2">
                      <input type="password" id="password" class="bg-white border border-[#CFCFCF] text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-[#0A8A33]" placeholder='confirm password' required />
                    </div>

                    
                    <button
                      className="bg-[#0A8A33]  mt-3 w-full text-white  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>{
                        setPasswordSuccessFullChange(true)
                        setIsChangePassword(false)
                      }}
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}