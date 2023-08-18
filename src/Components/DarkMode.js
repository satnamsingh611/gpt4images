"use client"
import useDarkMode from './hook/useDarkMode';

import {BiSun} from 'react-icons/bi'
import {BsMoon} from 'react-icons/bs'
// import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

/**
 * A toggle for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.open - Whether the sidebar is open or not.
 */
const DarkMode = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  /**
   * Toggles the dark mode.
   */
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <div className="nav">
      <span className="nav__item" onClick={handleMode}>
        {darkTheme ? (
          <>
            <div className="nav__icons flex pt-[7px]">
            <BsMoon style={{fontSize:"15px"}}></BsMoon>
            </div>
            {/* <h1 className={`${!props.open && "hidden"}`}>Light mode</h1> */}
          </>
        ) : (
          <>
            <div className="nav__icons flex pt-[7px]">
            
            <BiSun style={{fontSize:"20px"}}></BiSun>
            </div>
            {/* <h1 className={`${!props.open && "hidden"}`}>Night mode</h1> */}
          </>
        )}

      </span>
    </div>
  )
}

export default DarkMode;