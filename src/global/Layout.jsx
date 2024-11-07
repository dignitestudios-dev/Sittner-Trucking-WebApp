import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import LogOut from "../components/Logout/LogOut";
import { MyContext } from "../context/GlobalContext";
import DropdownList from "../components/Navbar/DropdownList";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { auth, onAuthStateChanged,collection, db, getDocs, query,where } from "../firbase/FirebaseInit";

const Layout = ({ pages }) => {
  const sidebarRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const {setEmployee,Employee}=useContext(MyContext);
  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  const navigate = useNavigate();
  const cookieData = Cookies.get('employe');
  useEffect(() => {
      if (cookieData) {
          try {
              const data = JSON.parse(cookieData);
              console.log(data, "data");
              
              if (data.email) {
                  setEmployee(data);
              } else {
                  setEmployee({});
                  navigate('/login');
              }
          } catch (error) {
              console.error("Error parsing cookie data:", error);
              setEmployee({});
              navigate('/login');
          }
      } else {
          setEmployee({});
          navigate('/login');
      }
  }, [cookieData]);
  

  return (
    <div className="w-screen h-[90vh] md:h-screen flex justify-start items-start overflow-hidden">
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[60%] z-[2000] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-[#181818]`}
        >
          <Sidebar />
        </div>
      </div>

      <div className="w-full relative lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)]   overflow-y-auto overflow-x-hidden">
        <div className="sticky  h-16 bg-white flex items-center justify-between lg:justify-end px-4 z-[99]">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <Navbar />
        </div>
        <div className="" >
        {pages}
        </div>
        <DropdownList />
        <LogOut />
     
      </div>
    </div>
  );
};

export default Layout;
