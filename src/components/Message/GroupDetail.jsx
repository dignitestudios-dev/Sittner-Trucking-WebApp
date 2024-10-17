import React, { useContext } from 'react'
import Attachment from './Attachment'
import Member from './Member'
import EditGroup from './EditGroup';
import { MyContext } from '../../context/GlobalContext';
import { MdOutlineClose } from "react-icons/md";
export default function GroupDetail() {
  const { isEditGroup, setEditGroup,LookScreen,setLookScreen,setSideDraw } = useContext(MyContext);
  return (
    <div className='bg-[#FFFFFF] h-[550px] w-[-webkit-fill-available] scroll-box  overflow-auto rounded-[24px] px-5 py-5'>
      <div className="flex items-center w-full mt-2 justify-between" >
        <div className='flex lg:hidden' >
         <button className='bg-transparent ' onClick={() => setSideDraw(false)}  ><MdOutlineClose size={20} /> </button>
        </div>
        {
          !LookScreen&&(
            <button className='bg-transparent ms-auto ' onClick={() => setEditGroup(!isEditGroup)}  > <img src="/whiteedit.png" className='w-5' alt="" /> </button>
          )
        }
      </div>
      <div className='flex flex-col items-center' >
        <div className='w-[88px] h-[88px]' >
          <img src="/messageprofile.jfif" className='w-full h-full rounded-full' alt="" srcset="" />
        </div>
        <h3 className='lg:text-base font-semibold leading-[19px] mt-3' >JB Sittner Trucking LLC</h3>
      </div>

      <Attachment />
      <Member />

      {/* Modal */}

      <EditGroup />
    </div>
  )
}
