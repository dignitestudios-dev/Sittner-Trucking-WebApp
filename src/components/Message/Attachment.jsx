import React, { useContext, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { MyContext } from "../../context/GlobalContext";
import ViewAllModal from "./ViewAllModal";
export default function Attachment() {
  const [openIndex, setOpenIndex] = useState(null);
  const { LookScreen, setLookScreen, viewAll, setIsViewAll } =
    useContext(MyContext);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const attachment = [
    {
      title: "Excel File.xls",
      img: "/bg-xl.webp",
    },
    {
      title: "Document File.pdf",
      img: "/bg-pdf.webp",
    },
    {
      title: "Important Picture.jpg",
      img: "/bg-jpg.webp",
    },
    {
      title: "Important Video.mp4",
      img: "/bg-mp4.webp",
    },
  ];
  return (
    <div>
      <div
        id="accordion-collapse"
        data-accordion="collapse"
        className={`${LookScreen ? "w-[40%]" : "w-full"}  mt-2 mx-auto`}
      >
        <div
          type="button"
          className={`flex flex-col items-start justify-between w-full py-4 font-medium rtl:text-right outline-none hover:opacity-95 `}
          data-accordion-target="#accordion-collapse-body-1"
        >
          <button
            name="faq-question"
            type="button"
            className={`flex border-b border-[#F2F2F2] pb-2  items-center justify-between w-full  font-medium rtl:text-right  outline-none hover:opacity-95  gap-3`}
            onClick={() => !LookScreen && handleToggle(1)}
          >
            <div
              className={`w-auto flex justify-start items-center text-xs md:text-sm lg:text-xl text-left gap-2 `}
            >
              <h2 className={`font-medium text-[13px]`}>Attachments</h2>
            </div>

            {!LookScreen &&
              (openIndex === 1 ? (
                <FaAngleDown className="text-xl" />
              ) : (
                <FaChevronUp className="text-xl" />
              ))}
          </button>

          <div
            id="accordion-1"
            className={`transition-all duration-200 ${
              !openIndex == 1 ? "" : "hidden"
            }`}
          >
            <div className="py-1 rounded-md mt-1 ">
              <ul className="max-w-md  dark:divide-gray-700">
                {attachment.map((item, i) => (
                  <li className="mt-3">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0 ">
                        <img className="w-10 " src={item.img} alt={item.img} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium  ">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}

                <button
                  onClick={() => setIsViewAll(true)}
                  className="bg-transparent text-[13px] font-medium text-[#007AFF] space-x-4 mt-3 underline"
                >
                  View all
                </button>
              </ul>
            </div>
          </div>
        </div>
        <ViewAllModal />
      </div>
    </div>
  );
}
