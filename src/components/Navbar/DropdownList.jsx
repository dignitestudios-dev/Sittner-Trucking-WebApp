import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../context/GlobalContext";
import {
  collection,
  db,
  doc,
  onSnapshot,
  updateDoc,
} from "../../firbase/FirebaseInit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import moment from "moment-timezone";

export default function DropdownList() {
  const {
    IsDropdownOpen,
    setIsDropdown,
    setNotificationCount,
    NotificationCount,
    Employee,
    NotificationCall,
  } = useContext(MyContext);

  const [notifications, setNotifications] = useState([]);
  const [UserRole, setUserRole] = useState("");
  const [pushNotification, setPushNotification] = useState(0);
  const [loading, setLoading] = useState(true);
  const previousNotificationCount = useRef(NotificationCount);

  const DropdownRef = useRef(null);
  const toggleModal = () => setIsDropdown(!IsDropdownOpen);

  // Helper to fetch and sort notifications
  const getNots = () => {
    const cookieData = Cookies?.get("employe");
    const employeeData = JSON.parse(cookieData || "{}");
    setUserRole(employeeData?.role);

    setLoading(true);

    const notificationsRef = collection(db, "notification");
    const unsubscribe = onSnapshot(notificationsRef, (querySnapshot) => {
      const now = moment.tz("America/Denver");
      const fetchedNotifications = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const notificationDate = moment.tz(
          `${data.date} ${data.time}`,
          "MM/DD/YYYY h:mm A",
          "America/Denver"
        );

        // Only show toast for scheduled notifications that are now due
        if (notificationDate.isSameOrBefore(now) && data.status === "Scheduled") {
          // Update notification status to "Delivered"
          updateDoc(doc.ref, {
            status: "Delivered",
            seen: [],
          });
        }

        fetchedNotifications.push({ id: doc.id, ...data });
      });

      // Sort notifications by date in descending order
      const sortedNotifications = fetchedNotifications.sort((a, b) => {
        const dateA = moment.tz(`${a.date} ${a.time}`, "MM/DD/YYYY h:mm A", "America/Denver").valueOf();
        const dateB = moment.tz(`${b.date} ${b.time}`, "MM/DD/YYYY h:mm A", "America/Denver").valueOf();
        return dateB - dateA;
      });

      setNotifications(sortedNotifications);
      setPushNotification(prev => prev + 1);
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getNots();

    // Set interval to fetch notifications every 30 seconds
    const intervalId = setInterval(() => {
      getNots();
    }, 30000);

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []); // Runs only once on mount and cleans up on unmount

  useEffect(() => {
    const deliveredNotifications = notifications.filter(notification => notification.status === "Delivered");

    // Filter old notifications based on employee's created time
    const employeeCreatedAt = new Date(Employee.createdat);
    const oldNot = deliveredNotifications.filter((notification) => {
      const notificationDate = new Date(`${notification.date} ${notification.time}`);
      return notificationDate > employeeCreatedAt;
    });

    // Find unseen notifications for current user
    const unseenNotifications = deliveredNotifications.filter((notification) => {
      return !notification.seen?.some(seen => seen.EmployeeId === Employee.id);
    });

    // Update notification count and local storage
    setNotificationCount(unseenNotifications.length);
    Cookies.set("notificationCount", unseenNotifications.length);

    // Trigger toast only if there are unseen notifications and the status is "Delivered"
    if (unseenNotifications.length > previousNotificationCount.current && UserRole === "user") {
      const newNotificationTitle = unseenNotifications[0]?.title || "New Notification";
      toast.success(newNotificationTitle.length > 16 ? `${newNotificationTitle.slice(0, 16)}...` : newNotificationTitle, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    previousNotificationCount.current = unseenNotifications.length;
  }, [notifications, Employee.createdat, UserRole, setNotificationCount]);
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
            {NotificationCount.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                No notifications available.
              </p>
            ) : (
              <ul className="max-w-md mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <li key={notification.id} className="pb-3 pt-3 sm:pb-4 mt-2 ">
                    <div className="flex space-x-4 ">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold">
                          {notification?.title}
                        </p>
                        <p className="text-[13px] text-[#909090] font-normal">
                          {notification.description &&
                          notification.description.length > 20
                            ? window.innerWidth <= 768
                              ? notification.description.slice(0, 20) + "..."
                              : notification.description.slice(0, 50) + "..."
                            : notification.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-[#717171] font-medium">
                          {notification.time}
                        </p>
                        <div className="inline-flex items-center justify-end text-base font-semibold text-gray-900">
                          <span className="">
                            {notification.seen === "pending" && (
                              <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-[#EF5151] text-white">
                                {notification.seen === "pending" ? "1" : ""}
                              </div>
                            )}
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
