import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import { ModernTimePicker } from '../../components/Picker/TimePicker';
import DatePicker from '../../components/Picker/DatePicker';

export default function EditNotification() {
    const navigate=useNavigate("")
    return (
        <div class='bg-[#F7F7F7] h-[80vh] py-5 px-5 ' >
            <NavLink to={'/notification'} className='font-semibold text-[24px] leading-[29px] flex items-center' > <IoMdArrowBack size={25} className='mr-2' /> Edit Notification</NavLink>

            <div class='bg-[#FFFFFF] mb-3 h-full border rounded-[10px] border-[#E4E4E4] mt-6 lg:py-5 lg:px-10' >
                <form onSubmit={(e)=>e.preventDefault()}>
                    <div className='mt-5 grid grid-cols-1 gap-5  lg:grid-cols-2' >
                        <div className='mb-1 col-span-2' >
                            <label htmlFor="" className='text-xs font-normal' >Title of Notification</label>
                            <input type="text" style={{border:"1px solid #00000030"}}  className="bg-white  text-gray-900 text-sm rounded-[12px]  h-[46px] mt-1  block w-full p-2.5 focus:outline-[#0A8A33]" placeholder='Type Here....' />
                        </div>
                        <div className='mb-1 col-span-2' >
                            <label htmlFor="" className='text-xs font-normal' >Description of Notification</label>
                            <textarea type="text"  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-[12px] h-[75px] mt-1  block w-full p-2.5 focus:outline-[#0A8A33]  " placeholder='Type Here....' ></textarea>
                        </div>
                       
                        <div className='mb-3 grid grid-cols-1  lg:grid-cols-2 col-span-2 lg:col-span-1'>
                            <DatePicker />
                            <ModernTimePicker />
                        </div>

                    </div>
                    <div className='flex items-center gap-5 mt-5' >
                        <button onClick={()=>navigate("/notification")} type="submit" className="text-white bg-[#0A8A33]  rounded-lg  w-[150px] h-[50px]  px-5 py-2.5 text-center">Update</button>
                        <NavLink to={'/notification'} className="bg-[#F1F1F1] font-bold rounded-lg  w-[150px] h-[50px]  px-5 py-2.5 text-center">Cancel</NavLink>
                    </div>
                </form>




                <div>
                </div>
            </div>
        </div>
    )
}
