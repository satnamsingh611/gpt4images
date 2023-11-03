"use client"
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import DarkMode from "../DarkMode";
import { MdClose, MdMenu } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import Setting from "../Setting";
import Modal from "../Modal";

const menyLinkStyle = {
  color: "rgb(255 255 255)",
  borderBottom: "1px solid",
  paddingTop: " 4px",
};

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* navigate **/
  // const navigate=useNavigate()
  /** */

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const newLocal = <DarkMode open={open} />;






  const LoginBtn = () => {
    //  if(!userEmail){
    //   navigate('/login')
    //  }else{
    //   localStorage.removeItem("userData")
    //   localStorage.removeItem("userToken")
    //   navigate('/login')
    //  }
  }



  return (
    <>
      <section
        className={` px-0 py-[8px] ${open ? " w-full " : "w-full h-[57px] sm:bg-black  sm:text-black"
          } sidebar  bg-black h-[57px] `}
      >
        <div className="sidebar__app-bar items-center justify-between">
          {/* <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'} sm-min:hidden`}>
            <span className='w-8 h-8'>
              <img src={bot} alt='' />
            </span>

          </div>  */}
          {/* <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'} object-none sm-min:hidden `}>
            AI42 Chat
          </h1>  */}
          <div className={`sidebar__btn-close w-[50%] pl-[10px] flex items-center`}>
            <div className="fabars_button w-[50%]">

            <span onClick={() => setOpen(!open)}>
              {!open ? (
                <MdMenu
                  className="sidebar__btn-icon"
                  style={{ fontSize: "25px" }}
                ></MdMenu>
              ) : (
                <MdClose
                  className="sidebar__btn-icon"
                  style={{ fontSize: "25px" }}
                ></MdClose>
              )}
            </span>
            </div>
            <div className="menu_button ml-3 w-[50%] flex">
            <button className="mr-5 " >Create</button>
            <button className="  ">Find</button>
          </div>
          </div>
          
         


          <div className="pr-[30px] flex gap-[2rem]">
            <button className=" subscribe_btn hover:bg-[#417cfb] transition-[0.25s] ">Subscribe</button>
            <button className="login_btn hover:bg-[#417cfb] transition-[0.25s] " >Logout</button>
          </div>
        </div>

        <div className="nav z-10 absolute top-[58px] ">
          <ul
            className="  dropdown-list  font-Rubik duration-200"
            style={{ height: !open ? "0" : "122px" }}
          >
            <li>
              <Link href='/'>
                <h1
                  className={`pl-2  ${!open && "hidden"
                    }  text-black `}
                  style={menyLinkStyle}
                >
                  Main page  <span >{<BiChevronRight className="w-[25px]" style={{ display: "inherit" }} />}</span>
                </h1>
              </Link>
            </li>
            <li>
              <Link href='/find'>
                <h1
                  className={`pl-2  ${!open && "hidden "
                    }  text-black`}
                  style={menyLinkStyle}
                >
                  Payment <span  >{<BiChevronRight className="w-[45px]" style={{ display: "inherit" }} />}</span>
                </h1>
              </Link >
            </li>
            <li>
              <h1 className="flex items-center cursor-pointer text-white">
                {newLocal}
              </h1>
            </li>
          </ul>
        </div>

        <Modal
          title="Setting"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Modal>
      </section>
    </>
  );
};

export default SideBar;
