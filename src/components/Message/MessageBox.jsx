import React, { useContext, useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineFilePresent } from "react-icons/md";
import { MyContext } from "../../context/GlobalContext";
import {
  addDoc,
  collection,
  db,
  getDocs,
  getDownloadURL,
  onSnapshot,
  orderBy,
  query,
  ref,
  storage,
  uploadBytesResumable,
  where,
} from "../../firbase/FirebaseInit";
import { toast } from "react-toastify";
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
  } = useContext(MyContext);
  const [Message, SetMessages] = useState([]);
  const [UserMsg, setUserMsg] = useState("");
  const [images, setImages] = useState([]);
  const [sentMessage, setSentMessage] = useState(0);
  const [sentLoad, setSentLoad] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("createdAt")); // Order by createdAt
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msg_array = [];
      querySnapshot.forEach((doc) => {
        msg_array.push({ id: doc.id, ...doc.data() }); // Include document ID
      });
      SetMessages(msg_array); // Set messages state
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [sentMessage]);

  useEffect(() => {
    const group = query(collection(db, "group"));
    const unsubscribe = onSnapshot(group, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setGroupName({ docId: doc.id, ...doc.data() });
      });
    });
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
        imageUrls.push(url);
        docType.push(image.type);
      }

      await addDoc(scheduledRef, {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        message: UserMsg,
        id: uniqueId,
        images: imageUrls,
        type: docType,
        UserMsgSeen: [],
        createdAt: new Date(),
        employeeId: Employee.id,
      });

      // Update the toast to show success
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

      // Update the loading toast to show an error
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
    setImages([...e.target.files]);
  };

  return (
    <div className="bg-[#FFFFFF] w-full  h-[80%] lg:h-[630px]  relative rounded-[24px]">
      {/* Message Head */}
      <div className="chathead px-5 py-5 border-b border-[#E1E1E1]">
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <div>
              <img
                src={GroupName.groupimg}
                class="rounded-[50%] object-cover cursor-pointer w-[50px] h-[50px] lg:w-[50px] lg:h-[50px]"
                alt=""
              />
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
              <h2 className="font-semibold text-base  lg:text-2xl leading-[29px]">
                {GroupName.group_name}
              </h2>
              <p className="text-[#8A8A8A] text-[13px] font-normal">
                50 members
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
                <MdOutlineFilePresent className="text-2xl" />
              </button>
            </div>
          )}
          <div></div>
        </div>
      </div>
      {/* Message Body */}
      <div
        className={`chat-body ${
          Employee?.role == "admin"
            ? "h-[70%] lg:h-[440px]"
            : "h-[70%] lg:h-[440px]"
        }  scroll-box  overflow-auto`}
      >
        {/* Day Timer */}
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
            } mb-3 px-3 py-3 w-auto lg:max-w-[30%]`}
          >
            {Employee?.role == "user" && (
              <div className="username mb-3">
                <h2 className="font-semibold text-sm leading-[14px] ">Admin</h2>
              </div>
            )}
            <div className="w-full py-2">
              {msg.message && (
                <div
                  className={` ${
                    Employee?.role == "admin"
                      ? "bg-[#0A8A33] text-white"
                      : "bg-[#F4F4F4]"
                  }   w-full rounded-2xl rounded-tr-none px-2 py-3 text-xs font-normal`}
                >
                  {msg.message}
                </div>
              )}
              {msg.images.length > 0 && (
                <div
                  className={`w-full py-3 grid grid-cols-${msg.images.length} gap-2`}
                >
                  {msg.images.length > 0 &&
                    msg.images.map((img, index) =>
                      msg.type[index].includes("image") ? (
                        <div
                          key={index}
                          className="w-full rounded-xl flex justify-center px-2 py-2 bg-[#F4F4F4]   text-xs font-normal"
                        >
                          <img
                            src={img}
                            className="cursor-pointer rounded-md h-[80px] w-[80px]"
                            onClick={() => {
                              setModalImageUrl(img);
                              setIviewImage(true);
                            }}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="w-full rounded-xl flex justify-center px-2 py-2 bg-[#F4F4F4]   text-xs font-normal"
                        >
                          <a href={img} download target="_blank">
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
                <div className="flex items-center ">
                  <div className="msg-view bg-[#E8F569] w-[30px] h-[30px] flex p-1 items-center justify-center rounded-full">
                    <img
                      src="/person1.png"
                      className="w-full h-full"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#B9FF9E] rounded-full">
                    <img
                      src="/person2.png"
                      className="w-full h-full"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div className="msg-view w-[30px] h-[30px] flex p-1 items-center justify-center bg-[#94D0E4] rounded-full">
                    <img
                      src="/person3.png"
                      className="w-full  h-full"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <img
                    src="/tick-double.png"
                    onClick={() => setIsMessageInfo(true)}
                    className="w-5 cursor-pointer ml-1 "
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
      </div>
      {/* Send Message */}
      {Employee?.role == "admin" && (
        <form
          onSubmit={(e) => HandleMessage(e)}
          className="w-100 bg-white px-3 p-3 lg:px-5 py-5 flex items-center absolute bottom-0 w-full  justify-center gap-8 "
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
              required
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
      )}
    </div>
  );
}
