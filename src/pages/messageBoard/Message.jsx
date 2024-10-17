import React, { useContext, useEffect, useState } from 'react'
import MessageBox from '../../components/Message/MessageBox'
import Look from '../../components/Message/Look'
import GroupDetail from '../../components/Message/GroupDetail'
import { MyContext } from '../../context/GlobalContext';
import { NavLink } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import AddMemberModal from '../../components/Message/AddMember';
import MessageInfo from '../../components/Message/MessageInfo';
import ViewImage from '../../components/Message/LargeImageModal';

export default function Message() {
    const { LookScreen, setLookScreen,token,setHideMsgGroup,hideMsgGroup} = useContext(MyContext);


    
    
    

    return (
        <div class='bg-[#F7F7F7]  py-2 px-4 lg:px-10 ' >
            <NavLink onClick={() => setLookScreen(false)} className='font-semibold text-[24px] hidden lg:flex mb-5 leading-[29px]  items-center' > <IoMdArrowBack size={25} className='mr-2' /> Message Board</NavLink>
            <div className='grid gap-5  grid-cols-1 lg:grid-cols-3 ' >
                {!LookScreen && (<div className={`${!LookScreen ? "col-span-2" : "col-span-1"}  `}  ><MessageBox /></div>)}
                {
                   hideMsgGroup&&token == "admin" && (
                        <div className={`${LookScreen ? "col-span-2" : "col-span-1"}  `}  >
                            <NavLink onClick={() => setLookScreen(false)} className='font-semibold text-[24px] flex lg:hidden mb-5 leading-[29px]  items-center' > <IoMdArrowBack size={25} className='mr-2' /> Back</NavLink>                            
                            <GroupDetail />
                        </div>
                    )
                }
                
                <div className='col-span-1' >
                    {token == "user"?(<Look />): LookScreen && (<Look />)}                    
                </div>
            </div>
<AddMemberModal/>
<MessageInfo/>  
<ViewImage/>
        </div>
    )
}
