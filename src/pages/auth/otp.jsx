import React, { useContext } from "react";
import LeftImage from "../../components/Auth/LeftImage";
import OtpCom from "../../components/Auth/OtpInput";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";

export default function Otp() {
  const {OtpVal,Otp}=useContext(MyContext);
  const navigate=useNavigate("");
  
  const HandleSubmit=()=>{
    console.log(Otp,OtpVal);
    if (Otp.trim()==OtpVal.trim()) {
    navigate("/updatepassword")
   }
   else{
    toast.error("wrong otp")
   }
  }

  return (
    <div className="grid sm:grid-cols-1 h-screen lg:grid-cols-2 p-3   md:py-10 md:px-10 gap-4 flex items-center ">
      <div className="h-full">
        <LeftImage />
      </div>
      <div className="">
        <div className="flex items-center flex-col mb-4">
          <img src="/logo.webp" className="mb-3 w-[150px]" alt="" />
          <h2 className="mb-3 font-bold text-[32px] leading-[38px]">
            Verification
          </h2>
          <p className="mb-3 font-medium text-base leading-[19px] text-center">
            Please enter the code that we sent to your email <br />{" "}
            <span className="font-bold"> mike.smith@gmail.com,</span> to reset
            your password.
          </p>
        </div>
        <OtpCom />
        <p className="mt-6 text-center text-[#8A8A8A] text-base font-medium ">
          Didn’t receive the code?{" "}
          <span class="text-[#0A8A33]"> Resend now</span>
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={HandleSubmit}
            className="text-white bg-[#0A8A33] lg:w-[370px] rounded-lg    px-5 py-2.5 text-center"
          >
            Next
          </button>
        </div>

        <div className="flex items-center justify-center mt-6">
          <NavLink
            to={"/forgotpassword"}
            className="flex items-center hover:text-[#0A8A33]"
          >
            <img src="/back.webp" width={20} alt="" />
            <span class="ml-1 text-base font-normal ">Back</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
