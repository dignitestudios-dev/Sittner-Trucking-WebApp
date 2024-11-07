import React, { useContext, useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdDeleteSweep, MdOutlineFilePresent } from "react-icons/md";
import { MyContext } from "../../context/GlobalContext";
import Loader from "../../global/Loader";
import {
  addDoc,
  collection,
  db,
  doc,
  getCountFromServer,
  getDocs,
  getDownloadURL,
  onSnapshot,
  orderBy,
  query,
  ref,
  storage,
  updateDoc,
  uploadBytesResumable,
  where,
} from "../../firbase/FirebaseInit";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
export default function MessageBox() {
  const {
    LookScreen,
    setLookScreen,
    setIsMessageInfo,
    setIviewImage,
    setSideDraw,
    hideLookAhed,
    setLookAhedDraw,
    Employee,
    setGroupName,
    GroupName,
    setModalImageUrl,
    setIsMessageSeen,
    setIsAttachments,
    setLoader,
    loader,
    msgSeenEmp,
    isMessageSeen,
    setMsgSeenEmp,
  } = useContext(MyContext);
  const [Message, SetMessages] = useState([]);
  const [UserMsg, setUserMsg] = useState("");
  const [images, setImages] = useState([]);
  const [sentMessage, setSentMessage] = useState(0);
  const [sentLoad, setSentLoad] = useState(false);
  const loc = useLocation();
  const msgBodyScroll = useRef();
  const [EmployeeCount, setEmployeeCount] = useState();

  useEffect(() => {
    if (sentMessage === 0) {
      setLoader(true);
    }

    const q = query(collection(db, "message"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const msgArray = [];
        querySnapshot.forEach((doc) => {
          msgArray.push({ docId: doc.id, ...doc.data() });
        });
        SetMessages(msgArray);
        setIsAttachments(msgArray);
        setLoader(false);
        setTimeout(() => {
          if (msgBodyScroll.current) {
            msgBodyScroll.current.scrollTop =
              msgBodyScroll.current.scrollHeight;
          }
        }, 600);
      },
      (error) => {
        console.error("Error fetching messages: ", error);
        setLoader(false);
      }
    );

    return () => {
      setLoader(false);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const groupQuery = query(collection(db, "group"));
      const unsubscribe = onSnapshot(groupQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setGroupName({ docId: doc.id, ...doc.data() });
        });
      });

      const employeeQuery = query(
        collection(db, "employee"),
        where("role", "==", "user")
      );
      const snapshot = await getCountFromServer(employeeQuery);
      setEmployeeCount(snapshot.data().count);
      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const generateUniqueId = async () => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    const existingEmployee = await getDocs(
      query(collection(db, "message"), where("id", "==", randomId))
    );
    if (!existingEmployee.empty) {
      return generateUniqueId();
    }
    return randomId;
  };
  const HandleMessage = async (e) => {
    e.preventDefault();
    setSentLoad(true);
    const trimmedUserMsg = UserMsg.trim();
    if (trimmedUserMsg === "" && images.length === 0) {
      toast.error("Please enter a message or upload an image.");
      setSentLoad(false);
      return;
    }
    // Create a loading toast
    const loadingToastId = toast.loading("Sending your message...");

    const scheduledRef = collection(db, "message");
    const imageUrls = [];
    const docType = [];

    try {
      const uniqueId = await generateUniqueId();
      for (const image of images) {
        const storageRef = ref(storage, `images/${uniqueId + image.name}`);
        await uploadBytesResumable(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageUrls.push({ url: url, name: image.name });
        docType.push(image.type);
      }
      const options = { timeZone: "America/Denver" };
      await addDoc(scheduledRef, {
        date: new Date().toLocaleDateString(),
        time: new Intl.DateTimeFormat("en-US", {
          ...options,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
        message: UserMsg,
        id: uniqueId,
        images: imageUrls,
        type: docType,
        UserMsgSeen: [],
        createdAt: new Date(),
        employeeId: Employee.id,
      });
      setImages([]);
      setUserMsg("");
      toast.update(loadingToastId, {
        render: "Message sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setSentMessage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to schedule:", error);

      toast.update(loadingToastId, {
        render: "Failed to send message. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSentLoad(false);
    }
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newImages]);
  };

  const MessageSeen = async () => {
    if (loc.pathname === "/") {
      for (const item of Message) {
        const scheduledRef = doc(db, "message", item.docId);
        console.log(item, "itemsssMsgs");

        const hasSeen = item?.UserMsgSeen?.some(
          (user) => user.EmployeeId == Employee.id
        );
        console.log(hasSeen, "hasSeend");

        if (!hasSeen) {
          const currentTime = new Date();
          const options = { timeZone: "America/Denver" };

          // Format the date and time
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            ...options,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(currentTime);

          const formattedTime = new Intl.DateTimeFormat("en-US", {
            ...options,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(currentTime);

          // Combine date and time
          const seenData = {
            seenTime: `${formattedDate} ${formattedTime}`,
            EmployeeId: Employee.id,
          };

          await updateDoc(scheduledRef, {
            UserMsgSeen: [...item.UserMsgSeen, seenData],
          });
        }
      }
    }
  };

  useEffect(() => {
    MessageSeen();
  }, [Message]);

  const [employee, setEmployee] = useState([]);

  const getEmploye = () => {
    const employeesRef = collection(db, "employee");
    const employeeQuery = query(employeesRef);
    const unsubscribe = onSnapshot(employeeQuery, (querySnapshot) => {
      const employeeData = querySnapshot.docs.map((doc) => ({
        docid: doc.id,
        ...doc.data(),
      }));
      setEmployee(employeeData);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getEmploye();
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const employeeIds = employee.map(data => data.id);
  //   const messageSeenEmp = Message.filter(item =>
  //     item.UserMsgSeen.some(user => employeeIds.includes(user.EmployeeId))
  //   );
  //   const seenEmployeeData = employee.map(emp => {
  //     const seenMessages = messageSeenEmp.filter(msg =>
  //       msg.UserMsgSeen.some(user => user.EmployeeId == emp.id)
  //     );

  //     const seenTimes = seenMessages.map(msg =>
  //       msg.UserMsgSeen.find(user => user.EmployeeId == emp.id)?.seenTime
  //     ).filter(Boolean);

  //     return {
  //       ...emp,
  //       seenTime: seenTimes.length > 0 ? seenTimes : null,
  //     };
  //   }).filter(emp => emp.seenTime);
  //   console.log(seenEmployeeData,messageSeenEmp,employeeIds,"testtting");

  //   setMsgSeenEmp(seenEmployeeData);
  // }, [Message, employee,isMessageSeen]);

  const col_Array = ["bg-[#E8F569]", "bg-[#B9FF9E]", "bg-[#94D0E4]"];

  return (
    <div className="bg-[#FFFFFF] w-full h-[78vh] md:h-[80%] lg:h-[630px] relative rounded-[24px]">
      {/* Message Head */}
      <div className="chathead h-[10%] px-2 lg:px-5 py-2 lg:py-3 border-b border-[#E1E1E1]">
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <div>
              {GroupName.groupimg ? (
                <img
                  src={GroupName.groupimg}
                  class="rounded-[50%] object-cover cursor-pointer  w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                  alt=""
                />
              ) : (
                <img
                  src={"noprofile.png"}
                  class="rounded-[50%] object-cover cursor-pointer w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                  alt=""
                />
              )}
            </div>
            <div
              className="ml-2 cursor-pointer "
              onClick={() =>
                (Employee?.role == "admin" || !hideLookAhed) &&
                (hideLookAhed
                  ? setLookScreen(!LookScreen)
                  : setLookAhedDraw(true))
              }
            >
              <h2 className="font-semibold text-base   lg:text-2xl lg:leading-[29px]">
                {GroupName.group_name}
              </h2>
              <p className="text-[#8A8A8A] text-[13px] font-normal">
                {EmployeeCount} members
              </p>
            </div>
          </div>
          {Employee?.role == "admin" && (
            <div className="ms-auto">
              <button
                className="text-white bg-[#0A8A33] hover:bg-green-800  rounded-full text-sm p-2.5 text-center flex lg:hidden items-center"
                onClick={() => {
                  setSideDraw(true);
                }}
              >
                <MdOutlineFilePresent className="text-base lg:text-2xl" />
              </button>
            </div>
          )}
          <div></div>
        </div>
      </div>
      {/* Message Body */}
      <div
        ref={msgBodyScroll}
        className={`md:chat-body ${
          Employee?.role == "admin"
            ? "h-[80%] lg:h-[440px]"
            : "h-[80%] lg:h-[540px]"
        }  scroll-box  overflow-auto`}
      >
        {/* Day Timer */}

        {loader ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-center py-2">
              <span className="bg-[#F4F4F4] rounded-full px-2 py-1 text-xs font-normal">
                Today
              </span>
            </div>
            {/* Messages */}
            {Message?.map((msg, i) => (
              <div
                key={i}
                className={`left-side ${
                  Employee?.role == "admin" && "ms-auto"
                } mb-3 px-3 py-3 msg-list w-auto lg:max-w-[100%]`}
              >
                {Employee?.role == "user" && (
                  <div className="username mb-3">
                    <h2 className="font-semibold text-sm leading-[14px] ">
                      Admin
                    </h2>
                  </div>
                )}
                <div className="w-full py-2">
                  {msg.message && (
                    <div
                      className={` ${
                        Employee?.role == "admin"
                          ? "bg-[#0A8A33] text-white ms-auto"
                          : "bg-[#F4F4F4] "
                      } w-full rounded-2xl rounded-tr-none break-words lg:w-[30%]  px-2 py-3 text-xs font-normal`}
                    >
                      <a
                        href={msg.message.includes("https://") && msg.message}
                        target="_blank"
                      >
                        {msg.message}
                      </a>
                    </div>
                  )}
                  {msg.images.length > 0 && (
                    <div
                      className={`w-full py-3 flex items-center  ${
                        Employee?.role == "admin" && "justify-end"
                      }  flex-wrap gap-2`}
                    >
                      {msg.images.map((img, index) =>
                        msg.type[index]?.includes("image") ? (
                          <div
                            key={index}
                            className="rounded-xl flex justify-center px-2 py-2 bg-[#F4F4F4] text-xs font-normal"
                          >
                            <img
                              src={img.url ? img.url : "/noprofile.png"}
                              className="cursor-pointer rounded-md h-[80px] w-auto"
                              onClick={() => {
                                const updatedImages = [
                                  img,
                                  ...msg.images.filter((_, i) => i !== index),
                                ]; 
                                setModalImageUrl(updatedImages);
                                setIviewImage(true);
                              }}
                              alt=""
                            />
                          </div>
                        ) : msg.type[index]?.includes("video") ? (
                          <div
                            key={index}
                            className="rounded-xl flex justify-center  bg-[#F4F4F4] text-xs font-normal"
                          >
                            <video
                              className="cursor-pointer rounded-md "
                              onClick={() => {}}
                              controls
                              src={img.url}
                            />
                          </div>
                        ) : msg.type[index]?.includes("spreadsheetml") ? (
                          <div
                            key={index}
                            className="rounded-xl flex justify-center px-2 py-2 bg-[#F4F4F4] text-xs font-normal"
                          >
                            <a
                              href={img.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/xl.png"
                                className="cursor-pointer"
                                alt=""
                              />
                            </a>
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="rounded-xl flex justify-center px-2 py-2 bg-[#F4F4F4] text-xs font-normal"
                          >
                            <a
                              href={img.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/pdf.png"
                                className="cursor-pointer"
                                alt=""
                              />
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 justify-end">
                  {Employee?.role == "admin" && (
                    <div className="flex items-center gap-2 ">
                      {/* {
                        msgSeenEmp.slice(0,4).filter((fil)=>fil.role!="admin").map((seen,i)=>(
                                                  
                      <div className={`msg-view ${col_Array[i]} w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full`}>
                        <img
                          src={seen.pic?seen.pic:"/noprofile.png"}
                          className="w-full h-full rounded-full "
                          alt=""
                          srcset=""
                        />
                      </div>
                     
                       ))
                      }
                       {
                    msgSeenEmp.length>3&&(
                      <div className={`msg-view bg-[#0A8A33] text-white w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full`}>
                       <span className="font-[20px]" >{msgSeenEmp.length}+</span>
                    </div>
                    )
                  } */}
                      <img
                        src="/tick-double.png"
                        onClick={() => {
                          const seenEmployeeData = msg.UserMsgSeen.map(
                            (user) => ({
                              EmployeeId: user.EmployeeId,
                              seenTime: user.seenTime,
                            })
                          );
                          const seenEmployeeIds = seenEmployeeData.map(
                            (user) => user.EmployeeId
                          );
                          const getMsgSeenEmp = employee
                            .map((emp) => {
                              const seenRecord = seenEmployeeData.find(
                                (user) => user.EmployeeId === emp.id
                              );
                              return {
                                ...emp,
                                seenTime: seenRecord
                                  ? seenRecord.seenTime
                                  : null,
                              };
                            })
                            .filter((emp) => seenEmployeeIds.includes(emp.id));

                          setIsMessageSeen(msg.UserMsgSeen);
                          setMsgSeenEmp(getMsgSeenEmp);
                          setIsMessageInfo(true);
                        }}
                        className="w-5 cursor-pointer ml-1"
                        alt=""
                      />
                    </div>
                  )}

                  <span className=" text-[10px] font-normal leading-[10px] text-[#797C7B]">
                    {msg?.time}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* Send Message */}
      {Employee?.role == "admin" && (
        <div className="pb-2 h-[10%] w-full bottom-0">
          {images.length > 0 && (
            <div className="shadow-xl bg-slate-100 px-2 py-2 w-[90%] mx-auto flex items-center gap-5 nowrap scroll-box  overflow-auto">
              {Array.from(images).map((image, targetIndex) => (
                <div key={targetIndex}>
                  <div className="flex justify-end px-3 pb-2">
                    <button
                      className="bg-transparent"
                      onClick={() => {
                        const newArray = images.filter(
                          (item, index) => index !== targetIndex
                        );
                        setImages(newArray);
                      }}
                    >
                      <IoMdClose className="text-red-500" />
                    </button>
                  </div>

                  {image.type?.includes("image") ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="h-[60px] rounded-md w-[60px]"
                      srcset=""
                    />
                  ) : image.type.includes("video") ? (
                    <img
                      src={"/video.webp"}
                      alt=""
                      className="h-[60px] rounded-md w-[60px]"
                      srcset=""
                    />
                  ) : image.type?.includes("spreadsheetml") ? (
                    <img
                      src={"/xl.webp"}
                      alt=""
                      className="h-[60px] rounded-md w-[60px]"
                      srcset=""
                    />
                  ) : (
                    <img
                      src={"/pdf.webp"}
                      alt=""
                      className="h-[60px] rounded-md w-[60px]"
                      srcset=""
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => HandleMessage(e)}
            className="w-100 bg-white px-3 p-3 lg:px-5 py-5 flex items-center  w-full  justify-center gap-5 "
          >
            <div className="relative w-[85%] h-[40px]">
              <div className="absolute inset-y-0 end-5 top-1 z-[9999]  flex items-center ">
                <label htmlFor="attach">
                  <GrAttachment color="#000000" className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="attach"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
              <input
                type="text"
                value={UserMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                id="email-address-icon"
                autocomplete="off"
                className="bg-[#FFFFFF] w-[100%] h-[100%] border border-[#CFCFCF] text-gray-900 text-sm rounded-2xl  block w-full p-2.5  focus:outline-[#0A8A33]"
                placeholder="Type Here"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={sentLoad ? sentLoad : sentLoad}
                className="text-white bg-[#0A8A33] hover:bg-green-800   rounded-full text-sm p-2.5 text-center flex items-center  "
              >
                <RiSendPlaneFill className="lg:text-2xl" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
