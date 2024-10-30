import React, { useContext } from "react";
import { MyContext } from "../../context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ViewImage() {
  const { viewImage, setIviewImage, ModalImageUrl } = useContext(MyContext);
  console.log(ModalImageUrl, "url");

  return (
    <>
      {viewImage ? (
        <>
          <div className="justify-center bg-view-image items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999999] outline-none focus:outline-none">
            <div className="relative   w-[650px]  my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="flex justify-end bg-white px-2 py-2" >
                <button onClick={() => setIviewImage(false)} >  <IoIosCloseCircleOutline size={30} /> </button>
              </div>
              <div className="border-0 h-[500px] w-[100%]  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  keyboard={{
                    enabled: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Keyboard, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {ModalImageUrl.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img?.url} className="rounded-lg   " alt="" srcset="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-40 bg-black"
            
          ></div>
        </>
      ) : null}
    </>
  );
}
