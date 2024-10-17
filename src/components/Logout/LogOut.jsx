import React, { useContext} from "react";
import { MyContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
export default function LogOut() {
    const {LogOut,setIsLogOut}=useContext(MyContext);
    const navigate=useNavigate("");
   const handleLogOut=()=>{
    localStorage.setItem("token","logout")
    setIsLogOut(false)
    navigate("/login")
   }

    
    return (
        <>
            {LogOut ? (
                <>
                    <div
                        className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-[350px]  my-6 mx-auto max-w-4xl">
                            {/*content*/}
                            <div className="border-0 h-[250px] rounded-[16px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                
                                {/*body*/}
                                <div className="relative p-6  flex flex-col items-center">
                                    <img src="/logout.png" className="mb-3" width={50} alt="" />
                                    <h3 className="font-semibold text-[20px] leading-[29px] mb-3 capitalize" >Logout</h3>
                                    <p className="text-[#565656] text-[13px] text-center font-medium leading-[13px] " >Are you sure you want to logout your account?</p>
                                    <div className="flex items-center w-full mt-2 justify-between" >
                                        <button className={`flex text-xs w-[140px] text-center bg-[#ECECEC] h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `} 
                                         onClick={() => setIsLogOut(false)}
                                        >No</button>
                                        <button className={`flex text-xs w-[140px] text-white text-center bg-[#EE3131] h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
                                         onClick={() => handleLogOut()}
                                        >Yes</button>
                                        
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