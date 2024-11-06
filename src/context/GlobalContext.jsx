import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const currentTime = new Date();
  const formattedTime = `${currentTime.getHours() % 12 || 12}:${String(currentTime.getMinutes()).padStart(2, '0')} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;

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
  const [sideDraw, setSideDraw] = useState(false);
  const [LookAhedDraw, setLookAhedDraw] = useState(false);
  const [Employee, setEmployee] = useState({});
  const [Otp, setOtp] = useState();
  const [displaySize,setDisplaySize]=useState(window.innerWidth);
  const [hideMsgGroup,setHideMsgGroup]=useState(false);
  const [hideLookAhed,sethideLookAhed]=useState(false);
  const [DeleteEmpId,setDeleteEmpId]=useState();
  const [DeleteDocId,setDeleteDocId]=useState();
  const [NotificationCount,setNotificationCount]=useState(0);
  const [SelectedDate,setSelectDate]=useState();
  const [SelectedTime,setSelectTime]=useState();
  
  useEffect(() => {
    const currentTime = new Date();
    // Mountain Time ke liye date aur time format karna
    const options = { timeZone: 'America/Denver' };
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      ...options,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(currentTime);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      ...options,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(currentTime);

    setSelectDate(formattedDate);
    setSelectTime(formattedTime);
  }, []);
   

  const [GroupName,setGroupName]=useState("");
  const [ModalImageUrl,setModalImageUrl]=useState("");
  const [isMessageSeen,setIsMessageSeen]=useState([]);
  const [IsAttachments,setIsAttachments]=useState([]);
  const [msgSeenEmp,setMsgSeenEmp]=useState([]);
  const [loader,setLoader] =useState(false);
  const [OtpVal,setOtpVal] =useState("");
  const [ForgetEmail,setForgetEmail] =useState("");
  const [RealTimeData,setRealTimeData] =useState(0);

  
  useEffect(() => {
    const handleResize = () => {
      setDisplaySize(window.innerWidth)       
    };
    setHideMsgGroup(displaySize>1023?true:false);
    sethideLookAhed(displaySize>1023?true:false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displaySize]);
  
const NotificationCall=()=>{

}

  return (
    <MyContext.Provider
      value={{
        setOtpVal,
        setRealTimeData,
        RealTimeData,
        OtpVal,
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
        sethideLookAhed,
        setEmployee,
        Employee,
        setOtp,
        Otp,
        DeleteEmpId,
        setDeleteEmpId,
        DeleteDocId,
        setDeleteDocId,
        setSelectDate,
        SelectedDate,
        SelectedTime,
        setSelectTime,
        setNotificationCount,
        NotificationCount,
        setGroupName,
        GroupName,
        setModalImageUrl,
        ModalImageUrl,
        setIsMessageSeen,
        isMessageSeen,
        setIsAttachments,
        IsAttachments,
        setLoader,
        loader,
        setForgetEmail,
        ForgetEmail,
        msgSeenEmp,
        setMsgSeenEmp,
        NotificationCall
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

