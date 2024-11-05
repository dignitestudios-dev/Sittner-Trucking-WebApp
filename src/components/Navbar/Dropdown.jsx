import React, { useContext, useState } from "react";
import { LuBell } from "react-icons/lu";
import { MyContext } from "../../context/GlobalContext";
import { collection, db, getDocs, onSnapshot, query, updateDoc, where } from "../../firbase/FirebaseInit";

export default function Dropdown() {
  const { IsDropdownOpen, setIsDropdown, NotificationCount,setNotificationCount } = useContext(MyContext);
  const [count, setCount] = useState(0);

  const handleDrop = () => {
    setIsDropdown(prev => !prev);
    setCount(prev => prev + 1);

      const notificationsRef = collection(db, "notification");
      const pendingNotificationsQuery = query(
        notificationsRef,
        where("seen", "==", "pending")
      );
      getDocs(pendingNotificationsQuery).then(querySnapshot => {
        const updates = querySnapshot.docs.map(doc => 
          updateDoc(doc.ref, { seen: "seen" })
        );
  
        Promise.all(updates)
          .then(() => {
            console.log("All notifications updated successfully.");
            setNotificationCount(0)
          })
          .catch(error => {
            console.error("Error updating notifications: ", error);
          });
      });
   
  };
  


  return (
    <>
      <button
        onClick={()=>handleDrop()}
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

