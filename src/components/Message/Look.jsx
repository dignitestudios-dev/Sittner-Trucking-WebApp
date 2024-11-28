import React, { useContext, useEffect, useState } from "react";
import LookBehind from "./LookBehind";
import LookAhead from "./LookAhead";
import {
  addDoc,
  collection,
  db,
  getDocs,
  onSnapshot,
  updateDoc,
} from "../../firbase/FirebaseInit";
import { MyContext } from "../../context/GlobalContext";
import moment from "moment";
import "moment-timezone";
import { CiLogout } from "react-icons/ci";
export default function Look() {
  const [IsBehind, setIsBehind] = useState(true);
  const { Employee } = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);
  const [PendNot, setPendNot] = useState([]);
  const [DelNot, setDelNot] = useState([]);

  useEffect(() => {
    // Function to fetch notifications and set them immediately when component mounts or IsBehind changes
    const fetchNotifications = async () => {
      const notificationsRef = collection(db, "look");
      const querySnapshot = await getDocs(notificationsRef);
      const fetchedNotifications = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        fetchedNotifications.push({ docId: doc.id, ...data });
      });

      const sortedNotifications = fetchedNotifications.sort(
        (a, b) =>
          new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
      );

      setNotifications(sortedNotifications);
    };

    // Fetch the data immediately when component mounts or IsBehind changes
    fetchNotifications();

    // Function to perform status update every 30 seconds
    const performStatusUpdate = async () => {
      const notificationsRef = collection(db, "look");
      const messageRef = collection(db, "message");

      const querySnapshot = await getDocs(notificationsRef);
      const updates = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const notificationDate = moment.tz(
          `${data.date} ${data.time}`,
          "MM/DD/YYYY h:mm A",
          "America/Denver"
        );
        const now = moment.tz("America/Denver");

        if (notificationDate.isSameOrBefore(now) && data.status === "pending") {
          // Update status to "Delivered"
          updates.push(updateDoc(doc.ref, { status: "Delivered" }));

          // Add to messages collection
          addDoc(messageRef, {
            time: data?.time,
            message: data?.message,
            UserMsgSeen: [],
            images: data?.images,
            id: data.id,
            type: data?.type,
            createdAt: new Date(),
            employeeId: Employee?.id,
          });
          fetchNotifications();
        }
      });

      if (updates.length > 0) {
        await Promise.all(updates);
      }
    };

    // Set an interval to run the status update function every 30 seconds
    const intervalId = setInterval(performStatusUpdate, 30000);

    // Clean up the interval when the component is unmounted or IsBehind changes
    return () => clearInterval(intervalId);
  }, [IsBehind, Employee]);
console.log(notifications,"------getLooks-----");

  useEffect(() => {
    const deliveredNotifications = notifications.filter(
      (notification) => notification.status === "Delivered"
    );
    const pendingNotifications = notifications.filter(
      (notification) => notification.status === "pending"
    );

    setPendNot(pendingNotifications);
    setDelNot(deliveredNotifications);
  }, [notifications]);

  return (
    <div
      className={`bg-[#fff] overflow-y-hidden rounded-[24px] ${
        Employee?.role == "user" ? "h-[84vh]" : "h-[80vh]"
      }`}
    >
      <div className="flex items-center w-full h-[12%] justify-evenly">
        <button
          className={`flex text-xs w-[170px]  text-center ${
            IsBehind ? "bg-[#0A8A33] text-white" : "bg-[#F7F7F7] "
          }  h-[44px] flex items-center justify-center rounded-[8px] font-semibold px-4 py-2   `}
          onClick={() => setIsBehind(true)}
        >
          Look Behind
        </button>
        <button
          className={`flex text-xs w-[170px]  text-center ${
            IsBehind ? "bg-[#F7F7F7] " : "bg-[#0A8A33] text-white"
          } h-[44px] flex items-center justify-center rounded-[8px] font-semibold px-4 py-2   `}
          onClick={() => setIsBehind(false)}
        >
          Look Ahead
        </button>
      </div>
      <div className="w-full h-[88%]">
        {IsBehind ? (
          <LookBehind deliveredNotifications={DelNot} />
        ) : (
          <LookAhead pendingNotifications={PendNot} />
        )}
      </div>
    </div>
  );
}
