import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineMoreHoriz } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../context/GlobalContext';
export default function EditEmp({empId,docId}) {
    const [dropdown, setDropdown] = useState(false);
    const {DeleteProfile,setIsDeleteProfile,setDeleteEmpId,setDeleteDocId}=useContext(MyContext);
    useEffect(()=>{
        setDeleteEmpId(empId);
        setDeleteDocId(docId);
    },[docId,empId])
    console.log(empId,"empId");
    
    return (
        <div className='relative'>
            <button className='bg-transparent' onClick={()=>setDropdown(!dropdown)} ><MdOutlineMoreHoriz color='black' size={20} /></button>
            {
                dropdown && (
                    <div className='w-[118px] h-[90px] py-5 rounded-[12px] shadow-xl bg-white absolute px-3 -left-20 z-[9999]'>
                        <div  >
                            <NavLink to={'/editmember'} state={{id:empId}} className={'font-medium text-[#000000] text-[13px]'}>Edit</NavLink>
                        </div>
                        <div className='mt-2' >
                            <button onClick={()=>setIsDeleteProfile(!DeleteProfile)} className={'font-medium text-[#000000] text-[13px]'}>Delete</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
