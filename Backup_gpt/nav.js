"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import {FaBars} from 'react-icons/fa'
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

// import bot from '../assets/bot.ico';
import DarkMode from "../DarkMode";
import Setting from "../Setting";
import Modal from "../Modal";

import TopbarBtns from "../NewComponents/TopbarBtns/TopbarBtns";

const menyLinkStyle = {
  color: "rgb(85 26 139) ",
  textDecoration: "underline rgb(85 26 139)",
};

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const NavBar = () => {
  const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  const [isOpenChat, setisOpenChat] = useState(false); //topic top bar button


  const servicesMenus = () => {
    setOpen(!open);
    setisOpenChat(false);

    // setisOpenShare(false);
  };



function useOutsideNav(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) ) {
        
       setOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const wrapperRef = useRef(null);
useOutsideNav(wrapperRef);


  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  

  const newLocal = (
    <div className={`nav__bottom `}>
      <DarkMode open={open} />
    </div>
  );
  return (
    <>
      <section
        className={` ${
          open ? " w-full" : "w-full h-[57px]  sm:text-black"
        } sidebar  bg-[#060b49] h-[57px] `}
      >
        <div className="sidebar__app-bar items-center">
          {/* <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'} sm-min:hidden`}>
            <span className='w-8 h-8'>
              <img src={bot} alt='' />
            </span>

          </div>  */}
          {/* <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'} object-none sm-min:hidden `}>
            AI42 Chat
          </h1>  */}
          <div className={` rounded  sidebar__btn-close`} onClick={servicesMenus}>
            
              <FaBars
                className=" sidebar__btn-icon"
                style={{ fontSize: "25px" }}
             
              ></FaBars>
           
          </div>

          <TopbarBtns
            isOpenChat={isOpenChat}
            setisOpenChat={setisOpenChat}
            setOpen={setOpen}
          />
        </div>

        <div className="nav z-10" ref={wrapperRef}>
          <ul className="  dropdown-list ">
            <li>
              <Link onClick={() => setOpen(false)} href="/" prefetch={false}>
                <h1
                  className={` sm:underline ${
                    !open && "hidden"
                  } underline text-black `}
                  style={menyLinkStyle}
                >
                  App
                </h1>
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen(false)} href="/Pay" prefetch={false}>
                <h1
                  className={` sm:underline ${
                    !open && "hidden "
                  } underline text-black`}
                  style={menyLinkStyle}
                >
                  Pay
                </h1>
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen(false)} href="https://ai42.app/#/" prefetch={false}>
                <h1
                  className={` sm:underline ${
                    !open && "hidden"
                  } underline  text-black`}
                  style={menyLinkStyle}
                >
                  AI42
                </h1>
              </Link>
            </li>
            
          </ul>
        </div>

      {newLocal}
        <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}> 
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Modal>
      </section>
     
    </>
  );
};

export default NavBar;

