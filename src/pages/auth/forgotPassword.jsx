import React, { useContext, useEffect, useRef, useState } from "react";
import LeftImage from "../../components/Auth/LeftImage";
import { NavLink } from "react-router-dom";
import emailjs from "@emailjs/browser"
import { MyContext } from "../../context/GlobalContext";

export default function ForgotPassword() {
  const [email,setEmail]=useState("")
  const {setOtp}=useContext(MyContext);
  const form = useRef();
   useEffect(()=>{
    emailjs.init("1mVFy68Lbo1hIkjxW");
   },[])

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm('service_9ontqnw', 'template_7lzu55c', form.current, {
  //       publicKey: '1mVFy68Lbo1hIkjxW',
  //     })
  //     .then(
  //       () => {
  //         console.log('SUCCESS!');
  //       },
  //       (error) => {
  //         console.log('FAILED...', error.text);
  //       },
  //     );
  // };
  
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   const randomOtp=Math.floor(100000 + Math.random() * 900000)
  //   var templateParams = {
  //     email:email,
  //     otp_code:randomOtp,
  //   };
  //   emailjs
  //     .sendForm('service_9ontqnw', 'template_7lzu55c', templateParams, {
  //       publicKey: '1mVFy68Lbo1hIkjxW',
  //     })
  //     .then(
  //       () => {
  //         console.log('SUCCESS!');
  //       },
  //       (error) => {
  //         console.log('FAILED...', error.text);
  //       },
  //     );
  // };

  return (
    <div className="grid sm:grid-cols-1 h-screen lg:grid-cols-2  md:py-10 md:px-10 gap-4 flex items-center ">
      <div className="h-full">
        <LeftImage />
      </div>
      <div className="">
        <div className="flex items-center flex-col">
          <img src="/logo.webp" className="mb-3" alt="" />
          <h2 className="mb-3 font-bold text-[32px] leading-[38px]">
            Forgot Password?
          </h2>
          <p className="mb-3 font-medium text-base leading-[19px] text-center">
            Enter your email to reset your password and <br /> swiftly resume
            your experience.
          </p>
        </div>
        <form ref={form} onSubmit={(e)=>sendEmail(e)} className="max-w-sm mx-auto mt-4">
          <div className="mb-5">
            <input
              type="email"
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:placeholder-gray-400  focus:outline-[#0A8A33] "
              placeholder="Email Address"
              required
            />
          </div>
          <div className="w-full">
            <button
            type="submit"
              className="text-white bg-[#0A8A33]  rounded-lg inline-flex justify-center w-full  px-5 py-2.5 text-center"
            >
              Next
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <NavLink
            to={"/login"}
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
