import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../context/GlobalContext";
import { collection, db, getDocs, onSnapshot, query, updateDoc } from "../../firbase/FirebaseInit";
import { toast } from "react-toastify";
import moment from "moment";
import 'moment-timezone';
export default function DropdownList() {
  const { IsDropdownOpen, setIsDropdown,setNotificationCount,setRealTimeData,Employee,NotificationCall } = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);
  const [DevNotifications, setDevNotifications] = useState([]);
  const [pushNotification, setpushNotification] = useState(0);
  const [NotTitle, setNotTitle] = useState("");
  const DropdownRef = useRef(null);
  const toggleModal = () => {
    setIsDropdown(!IsDropdownOpen);
  };

 useEffect(()=>{
  if (Employee.role=="user"&&pushNotification>0) {
    toast.success(NotTitle, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
 },[pushNotification])

  const getNots = () => {
    const notificationsRef = collection(db, "notification");
    const unsubscribe = onSnapshot(notificationsRef, (querySnapshot) => {
      const fetchedNotifications = [];
      const now = moment.tz("America/Denver");
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const notificationDate = moment.tz(`${data.date} ${data.time}`, "MM/DD/YYYY h:mm A", "America/Denver");
  
        if (notificationDate.isSameOrBefore(now) && data.status === "Scheduled") {
          setNotTitle(data?.description)
          updateDoc(doc.ref, {
            status: "Delivered",
            seen: "pending"
          })
          setpushNotification(prev=>prev+1)
                 
        }
        fetchedNotifications.push({ id: doc.id, ...data });
      });
  
      const sortedNotifications = fetchedNotifications.sort((a, b) => {
        const dateA = moment.tz(`${a.date} ${a.time}`, "MM/DD/YYYY h:mm A", "America/Denver").valueOf();
        const dateB = moment.tz(`${b.date} ${b.time}`, "MM/DD/YYYY h:mm A", "America/Denver").valueOf();
        return dateB - dateA; 
      });
      setNotifications(sortedNotifications);
    });
  
    return unsubscribe;
  };
  
useEffect(() => {
    const unsubscribe = getNots();
    const intervalId = setInterval(() => {
        getNots();
    }, 30000);

    return () => {
        clearInterval(intervalId);
        unsubscribe();
    };
}, []);

  


  useEffect(() => {
    const deliveredNotifications = notifications.filter(notification => notification.status === "Delivered");
    const pendingNotifications = notifications.filter(notification => notification.seen == "pending");
    const employeeCreatedAt = new Date(Employee.createdat);
    const oldNot = deliveredNotifications.filter(notification => {
        const notificationDate = new Date(`${notification.date} ${notification.time}`);
        return notificationDate > employeeCreatedAt;
    });
    console.log(pendingNotifications,"pending");
    
    if (pendingNotifications.length<0) {
      setNotificationCount(0);
    } else {
      setNotificationCount(pendingNotifications.length); 
    }

    setDevNotifications(oldNot);
  }, [notifications]);



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
                                  {
                                    notification.seen === "pending"&&(
                                      <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-[#EF5151] text-white">
                                        {notification.seen === "pending" ? "1" : ""}
                                    </div>
                                    )
                                  }
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
