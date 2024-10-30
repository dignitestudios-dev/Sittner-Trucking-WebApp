import React, { useContext, useEffect, useState } from "react";
import LookBehind from "./LookBehind";
import LookAhead from "./LookAhead";
import { toast } from "react-toastify";
import { addDoc, collection, db, getDocs, onSnapshot, updateDoc } from "../../firbase/FirebaseInit";
import { MyContext } from "../../context/GlobalContext";
export default function Look() {
  const [IsBehind, setIsBehind] = useState(true);
  const {Employee}=useContext(MyContext) 
  const [notifications, setNotifications] = useState([]);
  const [PendNot, setPendNot] = useState([]);
  const [DelNot, setDelNot] = useState([]);

  useEffect(() => {
    const notificationsRef = collection(db, "look");
    const messageRef = collection(db, "message");
    const unsubscribe = onSnapshot(notificationsRef, async (querySnapshot) => {
      const currentDate = new Date().toLocaleDateString("en-US");
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const fetchedNotifications = [];
      const updates = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const notificationDate = new Date(`${data.date} ${data.time}`);
        const now = new Date(`${currentDate} ${currentTime}`);

        fetchedNotifications.push({ docId: doc.id, ...data });
        if (notificationDate <= now && data.status !== "Delivered") {
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
          })
        }
      });

      if (updates.length > 0) {
        await Promise.all(updates);
      }
      fetchedNotifications.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));
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
      {IsBehind ? <LookBehind deliveredNotifications={DelNot} /> : <LookAhead pendingNotifications={PendNot} />}
    </div>
  );
}
