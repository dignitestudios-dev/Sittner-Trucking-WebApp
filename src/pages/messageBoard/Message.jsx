import React, { useContext, useEffect, useRef, useState } from "react";
import MessageBox from "../../components/Message/MessageBox";
import Look from "../../components/Message/Look";
import GroupDetail from "../../components/Message/GroupDetail";
import { MyContext } from "../../context/GlobalContext";
import { NavLink } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import AddMemberModal from "../../components/Message/AddMember";
import MessageInfo from "../../components/Message/MessageInfo";
import ViewImage from "../../components/Message/LargeImageModal";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import { collection, db, getDocs, updateDoc } from "../../firbase/FirebaseInit";
export default function Message() {
  const sidebarRef = useRef(null);
  const {
    LookScreen,
    setLookScreen,
    Employee,
    setHideMsgGroup,
    hideMsgGroup,
    setSideDraw,
    sideDraw,
    LookAhedDraw,
    hideLookAhed,
    setLookAhedDraw,
  } = useContext(MyContext);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);


  const [notifications, setNotifications] = useState([]);

useEffect(() => {
  const fetchNotifications = async () => {
    const currentDate = new Date().toLocaleDateString("en-US");
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    
    const notificationsRef = collection(db, "look");
    const querySnapshot = await getDocs(notificationsRef);
    const fetchedNotifications = [];

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      fetchedNotifications.push({ docId: doc.id, ...data });
      const notificationDate = new Date(`${data.date} ${data.time}`);
      const now = new Date(`${currentDate} ${currentTime}`);
         console.log(notificationDate,now,"dateing");
         
      // Compare the date and time
      if (notificationDate <= now) {
        await updateDoc(doc.ref, { status: "Delivered" });
      }
    });

    setNotifications(fetchedNotifications);
  };

  fetchNotifications();
}, []);

  
  const deliveredNotifications = notifications.filter(
    (notification) => notification.status == "Delivered"
  );
  const pendingNotifications = notifications.filter(
    (notification) => notification.status == "pending"
  );

  console.log(Employee, "roles");

  return (
    <div class="bg-[#F7F7F7] h-[100%]   py-2 px-2 lg:px-10 lg:py-6 ">
      {LookScreen && (
        <NavLink
          onClick={() => setLookScreen(false)}
          className="font-semibold text-[24px] hidden lg:flex mb-5 leading-[29px]  items-center"
        >
          {" "}
          <IoMdArrowBack size={25} className="mr-2" /> Message Board
        </NavLink>
      )}
      <div className="grid gap-5 h-[100%] grid-cols-1 lg:grid-cols-3 ">
        {hideLookAhed ? (
          !LookScreen && (
            <div className={`${!LookScreen ? "col-span-2" : "col-span-1"}  `}>
              <MessageBox />
            </div>
          )
        ) : (
          <div className={`${!LookScreen ? "col-span-2" : "col-span-1"}  `}>
            <MessageBox />
          </div>
        )}
        {!hideMsgGroup && Employee?.role == "admin" && (
          <div
            className={`w-screen h-screen fixed top-0 right-0 transition-all duration-500  ${
              sideDraw
                ? "lg:translate-x-0"
                : "translate-x-full lg:translate-x-0"
            } lg:static  z-[9999999] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
          >
            <div
              ref={sidebarRef}
              className={`fixed top-0 right-0 transition-all duration-200 ${
                sideDraw
                  ? "lg:translate-x-0"
                  : "translate-x-full lg:translate-x-0"
              } lg:static w-[80%] z-[9999999] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white`}
            >
              <GroupDetail />
            </div>
          </div>
        )}
        {hideMsgGroup && Employee?.role == "admin" && (
          <div className={`${LookScreen ? "col-span-2" : "col-span-1"}  `}>
            <GroupDetail />
          </div>
        )}
        {!hideLookAhed && (
          <div
            className={`w-screen h-screen fixed top-0 right-0 transition-all duration-500  ${
              LookAhedDraw
                ? "lg:translate-x-0"
                : "translate-x-full lg:translate-x-0"
            } lg:static  z-[9999999] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
          >
            <div
              ref={sidebarRef}
              className={`fixed top-0 right-0 transition-all duration-200 ${
                LookAhedDraw
                  ? "lg:translate-x-0"
                  : "translate-x-full lg:translate-x-0"
              } lg:static w-[90%] z-[9999999] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white`}
            >
              <div className="flex lg:hidden ms-auto mr-3 mt-3">
                <button
                  className="bg-transparent "
                  onClick={() => setLookAhedDraw(false)}
                >
                  <MdOutlineClose size={20} />{" "}
                </button>
              </div>
              <div className="col-span-1">
                {Employee?.role == "user" ? <Look pendingNotifications={pendingNotifications} deliveredNotifications={deliveredNotifications} /> : !LookScreen && <Look pendingNotifications={pendingNotifications} deliveredNotifications={deliveredNotifications} />}
              </div>
            </div>
          </div>
        )}
        {hideLookAhed && (
          <div className="col-span-1">
            {Employee?.role == "user" ? <Look pendingNotifications={pendingNotifications} deliveredNotifications={deliveredNotifications} /> : LookScreen && <Look pendingNotifications={pendingNotifications} deliveredNotifications={deliveredNotifications}/>}
          </div>
        )}
      </div>
      <AddMemberModal />
      <MessageInfo />
      <ViewImage />
    </div>
  );
}
