import React, { useContext, useEffect, useState } from "react";
import LookBehind from "./LookBehind";
import LookAhead from "./LookAhead";
import {
  addDoc,
  collection,
  db,  
  onSnapshot,
  updateDoc,
} from "../../firbase/FirebaseInit";
import { MyContext } from "../../context/GlobalContext";
import moment from "moment";
import 'moment-timezone';
export default function Look() {
  const [IsBehind, setIsBehind] = useState(true);
  const { Employee } = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);
  const [PendNot, setPendNot] = useState([]);
  const [DelNot, setDelNot] = useState([]);

  useEffect(() => {
    const notificationsRef = collection(db, "look");
    const messageRef = collection(db, "message");
    const unsubscribe = onSnapshot(notificationsRef, async (querySnapshot) => {
      const fetchedNotifications = [];
      const updates = [];
  
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
  
        // Create the notification date in Mountain Time using moment
        const notificationDate = moment.tz(`${data.date} ${data.time}`, "MM/DD/YYYY h:mm A", "America/Denver");
  
        // Get the current time in Mountain Time
        const now = moment.tz("America/Denver");
  
        // Format both dates for logging purposes
        const formattedNotificationDate = notificationDate.format("ddd MMM DD YYYY HH:mm:ss");
        const formattedCurrentDate = now.format("ddd MMM DD YYYY HH:mm:ss");
  
        console.log(formattedNotificationDate, formattedCurrentDate, "scheduledtime");
  
        fetchedNotifications.push({ docId: doc.id, ...data });
  
        // Check if the notification date is less than or equal to current time (Mountain Time)
        if (notificationDate.isSameOrBefore(now) && data.status === "pending") {
          updates.push(updateDoc(doc.ref, { status: "Delivered" }));
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
        }
      });
  
      if (updates.length > 0) {
        await Promise.all(updates);
      }
  
      fetchedNotifications.sort(
        (a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
      );
      setNotifications(fetchedNotifications);
    });
  
    return unsubscribe;
  }, [IsBehind]);
  
  
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
    <div className="bg-[#FFFFFF] h-[630px]  rounded-[24px]">
      <div className="flex items-center w-full mt-2 py-2 justify-evenly">
        <button
          className={`flex text-xs w-[170px]  text-center ${
            IsBehind ? "bg-[#0A8A33] text-white" : "bg-[#F7F7F7] "
          }  h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
          onClick={() => setIsBehind(true)}
        >
          Look Behind
        </button>
        <button
          className={`flex text-xs w-[170px]  text-center ${
            IsBehind ? "bg-[#F7F7F7] " : "bg-[#0A8A33] text-white"
          } h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
          onClick={() => setIsBehind(false)}
        >
          Look Ahead
        </button>
      </div>
      {IsBehind ? (
        <LookBehind deliveredNotifications={DelNot} />
      ) : (
        <LookAhead pendingNotifications={PendNot} />
      )}
    </div>
  );
}
