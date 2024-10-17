import React, { useContext, useEffect, useRef, useState } from 'react'
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
    const sidebarRef = useRef(null);
    const { LookScreen, setLookScreen, token, setHideMsgGroup, hideMsgGroup,setSideDraw,sideDraw } = useContext(MyContext);
    const toggleModal = () => {
        setSideDraw(!sideDraw);
      };
    return (
        <div class='bg-[#F7F7F7]  py-2 px-4 lg:px-10 lg:py-10 ' >
            {
                LookScreen&&(
                    <NavLink onClick={() => setLookScreen(false)} className='font-semibold text-[24px] hidden lg:flex mb-5 leading-[29px]  items-center' > <IoMdArrowBack size={25} className='mr-2' /> Message Board</NavLink>
                )
            }
            <div className='grid gap-5  grid-cols-1 lg:grid-cols-3 ' >
                {!LookScreen && (<div className={`${!LookScreen ? "col-span-2" : "col-span-1"}  `}  ><MessageBox /></div>)}
                {
                    !hideMsgGroup && token == "admin" && (
                        <div                          
                            className={`w-screen h-screen fixed top-0 right-0 transition-all duration-500  ${
                                sideDraw ? "lg:translate-x-0" : "translate-x-full lg:translate-x-0"
                                } lg:static  z-[9999999] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
                        >
                            <div
                                ref={sidebarRef}
                                className={`fixed top-0 right-0 transition-all duration-200 ${sideDraw ? "lg:translate-x-0":"translate-x-full lg:translate-x-0"
                                    } lg:static w-[80%] z-[9999999] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white`}
                            >
                                <GroupDetail />
                            </div>
                        </div>
                    )}
                {
                    hideMsgGroup && token == "admin" && (
                        <div className={`${LookScreen ? "col-span-2" : "col-span-1"}  `}  >                            
                            <GroupDetail />
                        </div>
                    )
                }

                <div className='col-span-1' >
                    {token == "user" ? (<Look />) : LookScreen && (<Look />)}
                </div>
            </div>
            <AddMemberModal />
            <MessageInfo />
            <ViewImage />
        </div>
    )
}
