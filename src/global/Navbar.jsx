import React, { useContext, useRef } from 'react'
import Dropdown from '../components/Navbar/Dropdown'
import { MyContext } from '../context/GlobalContext';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  const { token } = useContext(MyContext)

  return (
    <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
      <div className="flex items-center w-full justify-end pr-4">
        {
          token == "user" && (
            <div className='flex justify-end' >
              <Dropdown />
            </div>
          )
        }
        <NavLink to={'/profile'} className='flex items-center' >
          <img src={token=="admin"?"/admin.png":"/person.webp"} className='rounded-full cursor-pointer w-[40px] h-[40px] object-cover' alt="" />
          <div>
            <h2 className='font-medium ml-2 text-[13px] leading-[15px]' > {token=="admin"?"Chris Tom":"Mike Smith"}
              <br />
              <span className='text-[#9E9E9E]'>{token=="admin"?"Admin":"Employee"}</span>
            </h2>
          </div>
        </NavLink>
      </div>

    </div>
  )
}
