import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";
import { collection, db, onSnapshot, query } from "../../firbase/FirebaseInit";

export default function MessageList() {
  const { DeleteSchedule, setIsDeleteSchedule } = useContext(MyContext);

  const [scheduled, setscheduled] = useState([]);
  const getEmploye = () => {
    const employeesRef = collection(db, "scheduled");
    const employeeQuery = query(employeesRef);
    const unsubscribe = onSnapshot(employeeQuery, (querySnapshot) => {
      const employeeData = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setscheduled(employeeData);
    });
    return unsubscribe;
  };

  console.log(scheduled, "rec");

  useEffect(() => {
    const unsubscribe = getEmploye();
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#FFFFFF] border rounded-[10px] border-[#E4E4E4] mt-6 py-3 px-3 lg:py-6  lg:px-10">
      {scheduled.map((item, i) => (
        <div
          key={i}
          className="flex mb-2 items-center justify-between border-b-2 py-4 border-[#F4F4F4]"
        >
          <div className="msg w-[80%]  ">
            {item.message && (
              <p className="text-base font-normal text-[#18181880]">
                {item.message}
              </p>
            )}
            <div className="grid grid-cols-3 gap-2 lg:gap-2 mt-2  lg:grid-cols-10">
              {item?.images?.length > 0 &&
                item?.images?.map((img, i) => (
                  <div>
                    <img src={img} alt="" className="rounded-lg h-[80px] " />
                  </div>
                ))}
            </div>
            <div className="flex items-center mt-3 ">
              <span className="flex items-center text-[#5C5C5C] text-xs">
                <img src="/agenda.png" className="w-5 mr-2" alt="" srcset="" />
                {item.date}
              </span>
              <span className="flex items-center ml-3 text-[#5C5C5C] text-xs">
                <img src="/clock.png" className="w-5 mr-2" alt="" srcset="" />
                {item.time}
              </span>
            </div>
          </div>
          {
            item.status!="pending"?(
              <span className="bg-[#41C54E26] text-[#41C54E] text-xs font-medium me-2 px-4 py-2 rounded-full  ">
              Sent
            </span>
            ):(
              <div className="flex items-center">
              <button
                className="bg-transparent"
                onClick={() => setIsDeleteSchedule(!DeleteSchedule)}
              >
                <img src="/trash.png" className="w-5" alt="" srcset="" />
              </button>
              <NavLink to={"/editschedule"} className="ml-2 bg-transparent ">
                <img src="/whiteedit.png" className="w-5" alt="" srcset="" />
              </NavLink>
            </div>
            )
          }
        
        </div>
      ))}

    </div>
  );
}
