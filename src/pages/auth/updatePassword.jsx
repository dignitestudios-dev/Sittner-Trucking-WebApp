import React, { useContext, useState } from 'react'
import LeftImage from '../../components/Auth/LeftImage'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import UpdatePasswordModal from '../../components/Auth/UpdatePasswordModal'
import { MyContext } from '../../context/GlobalContext';

export default function UpdatePassword() {
  const [currentPass,setCurrentPass]=useState(false);
  const [NewPass,setNewPass]=useState(false);
  const {PasswordSuccessFullChange,setPasswordSuccessFullChange}=useContext(MyContext);
  return (
    <div class='grid h-screen grid-cols-1 xl:grid-cols-2  border h-screen py-10 px-10 gap-4 flex items-center ' >
    <div class='h-full' >
        <LeftImage />
    </div>
    <div class=''>
        <div class='flex items-center flex-col' >
            <img src="/logo.webp" class='mb-3 w-[150px]' alt="" />
            <h2 class='mb-5 font-bold text-[32px] leading-[38px]' >Update Password</h2>           
        </div>
        <form class="max-w-sm mx-auto mt-3  ">
        <div class="relative mb-3">
                        <input type={currentPass?"text":"password"} id="password" class="bg-gray-50 border border-[#CFCFCF] text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-[#0A8A33]"  placeholder='Enter New Password' required />
                        <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 ">
                        {
                                currentPass?(
                                    <div onClick={()=>setCurrentPass(!currentPass)} ><FaRegEye  className='text-gray-300 cursor-pointer' /></div>
                                ):(
                                    <div onClick={()=>setCurrentPass(!currentPass)}> <FaEyeSlash  className='text-gray-300 cursor-pointer' /></div>
                                )
                            }
                        </div>
                    </div>    
                    <div class="relative mb-2">
                        <input type={NewPass?"text":"password"} id="password" class="bg-gray-50 border border-[#CFCFCF] text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-[#0A8A33]"  placeholder='Re-enter New Password'  required />
                        <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 ">
                        {
                                NewPass?(
                                    <div onClick={()=>setNewPass(!NewPass)} ><FaRegEye  className='text-gray-300 cursor-pointer' /></div>
                                ):(
                                    <div onClick={()=>setNewPass(!NewPass)}> <FaEyeSlash  className='text-gray-300 cursor-pointer' /></div>
                                )
                            }
                        </div>
                    </div>      
            <div class='mt-5' >
                <button type="submit" onClick={()=>setPasswordSuccessFullChange(true)} class="text-white bg-[#0A8A33]  rounded-lg  w-full  px-5 py-2.5 text-center">Update Password</button>
            </div>
        </form>
              <UpdatePasswordModal/>
    </div>
</div>
  )
}
