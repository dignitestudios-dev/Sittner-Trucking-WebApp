import React, { useContext, useEffect, useRef } from "react";
import Dropdown from "../components/Navbar/Dropdown";
import { MyContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";
import { addDoc, collection, db, getDocs, onSnapshot, updateDoc } from "../firbase/FirebaseInit";
import Cookies from 'js-cookie';
export default function Navbar() {
  const {Employee } = useContext(MyContext);
  const DropdownRef = useRef(null);
  const toggleModal = () => {
    setIsDropdown(!IsDropdownOpen);
  };

  useEffect(() => {
    const cookieData = Cookies.get('employe');
    if (cookieData) {
      const Empdata = JSON.parse(cookieData);
      const notificationsRef = collection(db, "scheduled");
      const MessageRef = collection(db, "message");
      const unsubscribe = onSnapshot(notificationsRef, (querySnapshot) => {
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true });
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          const notificationDate = new Date(data.date + ' ' + data.time);
          if (notificationDate <= currentDate && data.status === "pending") {
            await updateDoc(doc.ref,{status: "Sent" });
            await addDoc(MessageRef, {
              time: data?.time,
              message: data?.message,
              UserMsgSeen: [],
              images: data?.images,
              id:data.id,
              type: data?.type,
              createdAt: new Date(),
              employeeId: Empdata?.id,
            });
          }
        });
      });
      return () => unsubscribe();
    }
  }, []);


  return (
    <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
      <div className="flex items-center w-full justify-end pr-4">
        {Employee?.role == "user" && (
          <div className="flex justify-end">
            <Dropdown />
          </div>
        )}
        {Employee?.role == "user" ? (
          <NavLink to={"/profile"} state={{id:Employee.id}} className="flex items-center">
           <img
              src={Employee?.role == "user"&&Employee.pic?Employee?.pic:"/noprofile.png"}
              className="rounded-full cursor-pointer w-[40px] h-[40px] object-cover"
              alt=""
            />
            <div>
              <h2 className="font-medium ml-2 text-[13px] leading-[15px]">
                {" "}
                {Employee?.name}
                <br />
                <span className="text-[#9E9E9E]">
                  {Employee?.role == "admin" ? "Admin" : "Employee"}
                </span>
              </h2>
            </div>
          </NavLink>
        ) : (
          <button className="flex items-center">
            <img
              src={Employee?.role == "admin"&&Employee?.pic?Employee?.pic:"/noprofile.png"}
              className="rounded-full cursor-pointer w-[40px] h-[40px] object-cover"
              alt=""
            />
            <div>
              <h2 className="font-medium ml-2 text-[13px] leading-[15px]">
                {" "}
                {Employee?.name}
                <br />
                <span className="text-[#9E9E9E]">
                  {Employee?.role == "admin" ? "Admin" : "Employee"}
                </span>
              </h2>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
