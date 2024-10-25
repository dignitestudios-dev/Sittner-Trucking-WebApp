import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";
import { collection, db, onSnapshot, query } from "../../firbase/FirebaseInit";
import Loader from "../../global/Loader";

export default function MessageList() {
  const { DeleteSchedule, setIsDeleteSchedule, DeleteProfile, setIsDeleteProfile,setLoader,loader } = useContext(MyContext);

  const [scheduled, setscheduled] = useState([]);
    
  const getEmploye = () => {
    const employeesRef = collection(db, "scheduled");
    const employeeQuery = query(employeesRef);    
    setLoader(true);
    const unsubscribe = onSnapshot(
        employeeQuery,
        (querySnapshot) => {
            const employeeData = querySnapshot.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
            }));            
            setscheduled(employeeData);
            // Set loader to false after data is fetched
            setLoader(false);
        },
        (error) => {
            console.error("Error fetching data: ", error);
            // Set loader to false if there's an error
            setLoader(false);
        }
    );

    return unsubscribe;
};

useEffect(() => {
    const unsubscribe = getEmploye();
    return () => unsubscribe();
}, []);

  return (
    <div className="bg-[#FFFFFF] border rounded-[10px] border-[#E4E4E4] mt-6 py-3 px-3 lg:py-6  lg:px-10">

      {
      
      loader?(<Loader/>):(
      scheduled.length === 0 ? (
    <div className="text-center text-gray-500 mt-4">
        No scheduled items available.
    </div>
) : (
      scheduled.map((item, i) => (
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
              {
                item?.images?.length > 0 &&
                item?.images?.map((img, i) => 
                (
                    item.type[i].includes("image")?(
                      <div>
                      <img src={img} alt="" className="rounded-lg h-[80px] " />
                      </div>
                      ):(
                        <div>
                        <img src={"/pdf.png"} alt="" className="rounded-lg h-[50px] " />
                        </div>
                      )
                    )
                )
              }
               
                
                
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
                onClick={() =>
                {
                  setIsDeleteProfile(item)
                  setIsDeleteSchedule(!DeleteSchedule)
                }
                  }
              >
                <img src="/trash.png" className="w-5" alt="" srcset="" />
              </button>
              <NavLink to={"/editschedule"} state={{data:item}} className="ml-2 bg-transparent ">
                <img src="/whiteedit.png" state={{data:item}} className="w-5" alt="" srcset="" />
              </NavLink>
            </div>
            )
          }
        
        </div>
      ))
    )
  )
    
    }

    </div>
  );
}
