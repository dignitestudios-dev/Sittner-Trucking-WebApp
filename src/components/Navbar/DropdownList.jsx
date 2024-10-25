import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../context/GlobalContext";
import { collection, db, getDocs, onSnapshot, query, updateDoc } from "../../firbase/FirebaseInit";

export default function DropdownList() {
  const { IsDropdownOpen, setIsDropdown,setNotificationCount,setRealTimeData,RealTimeData } = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);
  const [DevNotifications, setDevNotifications] = useState([]);

  const DropdownRef = useRef(null);
  const toggleModal = () => {
    setIsDropdown(!IsDropdownOpen);
  };

  useEffect(() => {
    const notificationsRef = collection(db, "notification");

    const unsubscribe = onSnapshot(notificationsRef, (querySnapshot) => {
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        
        const fetchedNotifications = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const notificationDate = new Date(data.date + ' ' + data.time); // Assuming date and time are in proper format
            
            fetchedNotifications.push({ id: doc.id, ...data });
            // Check if the notification date and time is less than or equal to the current date and time
            if (notificationDate <= currentDate && data.status !== "Delivered") {
                // Update status to "Delivered"
                updateDoc(doc.ref, { status: "Delivered" });
                setRealTimeData(prev=>prev+1)
            }
        });

        // Set notification count
        setNotificationCount(fetchedNotifications.length);

        // Sort notifications by date and time (latest first)
        const sortedNotifications = fetchedNotifications.sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.time);
            const dateB = new Date(b.date + ' ' + b.time);
            return dateB - dateA; // Sort in descending order
        });

        setNotifications(sortedNotifications);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
}, []);

  useEffect(()=>{
    const deliveredNotifications = notifications.filter(notification => notification.status === "Delivered");
    setDevNotifications(deliveredNotifications)
  },[RealTimeData]) 


  return (
    <>
      {IsDropdownOpen && (
        <div
          onClick={toggleModal}
          style={{ position: "fixed", top: "0px" }}
          className={` h-[350px]   transition-all duration-500  ${
            IsDropdownOpen
              ? "opacity-1 translate-y-11"
              : "opacity-0 translate-y-8"
          } lg:static  px-3 w-[300px] md:w-[400px] flex flex-col right-[7px] lg:right-[40px] gap-3 items-center justify-start py-0  `}
        >
          <div
            ref={DropdownRef}
            className={`fixed top-0 right-0 transition-all shadow-xl duration-200  ${
              IsDropdownOpen
                ? "opacity-1 translate-y-8"
                : "opacity-0 translate-y-8"
            } lg:static w-[100%] overflow-auto  scroll-box gap-3 rounded-[16px] px-5 py-5 h-full bg-[#FFFFFF]`}
          >
            <h3 className="text-base leading-[19px] font-bold">
              Notifications
            </h3>
            {DevNotifications.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No notifications available.</p>
            ) : (
            <ul className="max-w-md mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            {DevNotifications.map((notification) => (
                <li key={notification.id} className="pb-3 pt-3 sm:pb-4 mt-2 ">
                    <div className="flex space-x-4 ">
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold">New Messages From Admin</p>
                            <p className="text-[13px] text-[#909090] font-normal">{notification.description}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-xs text-[#717171] font-medium">{notification.time}</p>
                            <div className="inline-flex items-center justify-end text-base font-semibold text-gray-900">
                                <span className="">
                                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-[#EF5151] text-white">
                                        {notification.status === "Delivered" ? "1" : "📭"}
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
