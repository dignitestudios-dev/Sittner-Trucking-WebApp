import React, { createContext, useEffect, useState } from "react";
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

  const [PasswordSuccessFullChange, setPasswordSuccessFullChange] = useState(false);
  const [ChangePassword, setIsChangePassword] = useState(false);
  const [LogOut, setIsLogOut] = useState(false);
  const [IsDropdownOpen, setIsDropdown] = useState(false);
  const [isEditGroup, setEditGroup] = useState(false);
  const [LookScreen, setLookScreen] = useState(false);
  const [DeleteSchedule, setIsDeleteSchedule] = useState(false);
  const [DeleteProfile, setIsDeleteProfile] = useState(false);
  const [viewAll, setIsViewAll] = useState(false);
  const [AddMem, setIsAddMem] = useState(false);
  const [MessageInfo, setIsMessageInfo] = useState(false);
  const [viewImage, setIviewImage] = useState(false);
  const [token,setToken]=useState("");
  const user=localStorage.getItem("token");
  const [sideDraw, setSideDraw] = useState(false);
  const [LookAhedDraw, setLookAhedDraw] = useState(false);



  const [displaySize,setDisplaySize]=useState(window.innerWidth);
  const [hideMsgGroup,setHideMsgGroup]=useState(false);
  const [hideLookAhed,sethideLookAhed]=useState(false);
  useEffect(() => {
    const handleResize = () => {
      setDisplaySize(window.innerWidth)       
    };
    setHideMsgGroup(displaySize>1023?true:false);
    sethideLookAhed(displaySize>1023?true:false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displaySize]);
  
  useEffect(()=>{
    if(user=="admin") {
     setToken("admin");
   }
   else if(user=="user") {
     setToken("user");
   }
   else if(user=="logout") {
     setToken("logout");
   }
 },[user])

  return (
    <MyContext.Provider
      value={{
        PasswordSuccessFullChange,
        setPasswordSuccessFullChange,
        ChangePassword,
        setIsChangePassword,
        LogOut,
        setIsLogOut,
        setIsDropdown,
        IsDropdownOpen,
        isEditGroup,
        setEditGroup,
        LookScreen,
        setLookScreen,
        DeleteSchedule,
        setIsDeleteSchedule,
        setIsDeleteProfile,
        DeleteProfile,
        token,
        setToken,
        setIsViewAll,
        viewAll,
        AddMem,
        setIsAddMem,
        setIsMessageInfo,
        MessageInfo,
        viewImage,
        setIviewImage,
        hideMsgGroup,
        setHideMsgGroup,
        setSideDraw,
        sideDraw,
        hideLookAhed,
        LookAhedDraw,
        setLookAhedDraw,
        sethideLookAhed
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
