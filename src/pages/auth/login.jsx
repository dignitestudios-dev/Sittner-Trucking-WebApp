import React, { useContext, useState } from "react";
import LeftImage from "../../components/Auth/LeftImage";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";
export default function Login() {
  const { setToken } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const Login = (e) => {
    e.preventDefault();
    const userType = email.includes("admin@gmail.com");
    localStorage.setItem("token", userType ? "admin" : "user");
    userType ? setToken("admin") : setToken("user");
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 p-3  h-screen  lg:py-10 lg:px-10  lg:gap-4  flex items-center ">
      <div className="h-full">
        <LeftImage />
      </div>
      <div className="">
        <div className="flex items-center flex-col ">
          <img src="/logo.webp" className="mb-3 w-[150px]  " alt="" />
          <h2 className="mb-3 font-bold text-[32px] leading-[38px]">
            Welcome Back
          </h2>
          <p className="mb-3 font-medium text-base leading-[19px]">
            Please enter the details below to continue
          </p>
        </div>
        <form className="max-w-sm mx-auto mt-3" onSubmit={(e) => Login(e)}>
          <div className="mb-5">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg   block w-full p-2.5   focus:outline-[#0A8A33] "
              placeholder="mikesmith@gmail.c"
              required
            />
          </div>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-[#0A8A33] "
              placeholder="Password"
              required
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 ">
              {showPassword ? (
                <div onClick={() => setShowPassword(!showPassword)}>
                  <FaRegEye className="text-gray-400 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setShowPassword(!showPassword)}>
                  {" "}
                  <FaEyeSlash className="text-gray-400 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <div className="mb-2 mt-2 text-end">
            <NavLink to={"/forgotpassword"} className={"font-medium text-xs"}>
              Forgot Password
            </NavLink>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-[#0A8A33]  rounded-lg  w-full  px-5 py-2.5 text-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
