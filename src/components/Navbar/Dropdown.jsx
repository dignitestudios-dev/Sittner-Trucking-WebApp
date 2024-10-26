import React, { useContext, useState } from "react";
import { LuBell } from "react-icons/lu";
import { MyContext } from "../../context/GlobalContext";
import { collection, db, onSnapshot, query, updateDoc, where } from "../../firbase/FirebaseInit";

export default function Dropdown() {
  const { IsDropdownOpen, setIsDropdown, NotificationCount } = useContext(MyContext);
  const [count, setCount] = useState(0);

  const handleDrop = () => {
    setIsDropdown(prev => !prev);          
    setCount(prev => prev + 1);
    if (count==2) {
          // Create a query to filter notifications where seen is "pending"
    const notificationsRef = collection(db, "notification");
    const pendingNotificationsQuery = query(
      notificationsRef,
      where("seen", "==", "pending"),
      where("status", "==", "Delivered")
    );
    // Use a one-time snapshot to get pending notifications
    onSnapshot(pendingNotificationsQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, { seen: "see" });
      });
    });
    }

  };

  return (
    <>
      <button
        onClick={handleDrop}
        className="w-[32px] h-[32px] flex items-center justify-center mr-5 relative right-0 border-2 bg-[#F2F3F4] border-transparent text-gray-800 rounded-[8px] hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
        aria-label="Notifications"
      >
        <LuBell />
        <span className="absolute -inset-2 object-right-top -mr-8">
          <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-[#EF5151] text-white">
            {NotificationCount}
          </div>
        </span>
      </button>
    </>
  );
}

