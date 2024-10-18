import React, { useContext } from "react";
import { MyContext } from "../../context/GlobalContext";
import { IoMdClose } from "react-icons/io";
export default function ViewImage() {
  const { viewImage, setIviewImage } = useContext(MyContext);

  return (
    <>
      {viewImage ? (
        <>
          <div
            onClick={() => setIviewImage(false)}
            className="justify-center bg-view-image items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative   w-[550px]  my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 h-full  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <img
                  src="/large-truck.png"
                  className="rounded-lg"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
