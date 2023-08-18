"use client"
import React,{useState,useRef,useEffect} from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import {  faPlus } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
const SortBtn=({handlePageClick,totalData,setSortData,getImg,setSortToggle})=>{
    const [includesToggle, setIncludesToggle] = useState(false);
    const [excludesToggle, setExcludesToggle] = useState(false);
    const [sortvalue, setSortvalue] = useState(""); // exclude include inter value
      //Sorting States
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  /*const [isOpen3, setIsOpen3] = useState(false);*/
  const [exIn, setExIn] = useState(false);

  const dateDrop = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
    setExIn(false);
    setIncludesToggle(false);
    setExcludesToggle(false);
  };

  const likeDrop = () => {
    setIncludesToggle(false);
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setExcludesToggle(false);
  };

  /************************************************** */
  ///for like out side event

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen2(false);
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

  // for date event outside clck
  function useOutsideAlerter1(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen1(false);
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

  function useOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setExIn(false);
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

  function useOutsideInclude(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIncludesToggle(false);
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

  function useOutsideExclude(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setExcludesToggle(false);
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

  const wrapperRef = useRef(null); // for like sorting
  useOutsideAlerter(wrapperRef);

  const wrapperRef1 = useRef(null); // for date sorting
  useOutsideAlerter1(wrapperRef1);

  const searchRef = useRef(null); // for search inclue exclude words mobile device
  useOutsideClick(searchRef);

  const includeOutSide = useRef(null);
  useOutsideInclude(includeOutSide);

  const excludesOutside = useRef(null);
  useOutsideExclude(excludesOutside);

  // includes button

  const includesbtn = () => {
    setIncludesToggle(!includesToggle);
    setExcludesToggle(false);
  };
  // exclides button
  const Excludesbtn = () => {
    setExcludesToggle(!excludesToggle);
    setIncludesToggle(false);
  };

  /******************************************************************** */

  const sortData = (sortBy, sortOrder) => {
    if (sortBy === "include") {
      if (!sortvalue) {
        alert("include words");
      }
      axios
        .get(process.env.Get_Images_OJ + `include/${sortvalue}`)
        .then((res) => {
          console.log("includeObj", res.data);
          setSortData(res.data);
          GetImageData();
        })
        .catch((err) => {
          console.log(err.messge);
        });
    } else if (sortBy === "exclude") {
      axios
        .get(process.env.Get_Images_OJ + `exclude/${sortvalue}`)
        .then((res) => {
          console.log("in", res.data);
          setSortData(res.data);
          setIncludesToggle(false);
        })
        .catch((err) => {
          console.log(err.messge);
        });
    }

    const sortedArray = [...getImg].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
      }
      if (sortBy === "likes") {
        return sortOrder === "Ascending"
          ? a.likes - b.likes
          : b.likes - a.likes;
      }

      return 0;
    });

    setSortData(sortedArray);
    setSortToggle(true);
  };
    return(
     <>
    <div className="shortbtn z-[9999]">
            <h4>
              <strong className="text-grey dark:text-white">Sort By:</strong>{" "}
            </h4>
            <div className="sm:w-[250px] sm:gap-[6px] flex   gap-[1rem]">
              <div className="relative inline-block " ref={wrapperRef1}>
                <button
                  className=" bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
                  onClick={likeDrop}
                >
                  Likes
                </button>
                {isOpen1 && (
                  <div className=" absolute  top-[-105px] z-10 mt-2 py-2 w-[7rem] text-white bg-[#060b49]  rounded shadow-md left-[-14px]">
                    <button
                      className="w-[98px] border m-auto rounded-[10px] border-solid block py-2 hover:bg-[#2b274c]"
                      onClick={() => sortData("likes", "Ascending")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "15px", marginTop: "2px" }}
                        icon={faPlus}
                      />
                      {""} Least
                    </button>
                    <button
                      className="block w-[98px] m-auto mt-1 py-2 border border-white rounded-[10px] hover:bg-[#2b274c]"
                      onClick={() => sortData("likes", "Descending")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "15px", marginTop: "2px" }}
                        icon={faPlus}
                      />
                      {""} Most
                    </button>
                  </div>
                )}
              </div>
              {/* // date sorting */}
              <div className="relative inline-block" ref={wrapperRef}>
                <button
                  className=" bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
                  onClick={dateDrop}
                >
                  Date
                </button>
                {isOpen2 && (
                  <div className="absolute text-white top-[-105px] z-10 mt-2 py-2 w-[8rem] bg-[#060b49] rounded shadow-md left-[-17px]">
                    <button
                      className="border m-auto rounded-[10px] border-solid block w-[111px] px-4 py-2  hover:bg-[#2b274c]"
                      onClick={() => sortData("date", "Ascending")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "15px", marginTop: "2px" }}
                        icon={faPlus}
                      />
                      {""} {""} {""} Oldest
                    </button>
                    <button
                      className="border mt-1 w-28 m-auto rounded-[10px] hover:bg-[#2b274c] border-solid block  px-4 py-2  "
                      onClick={() => sortData("date", "Dscending")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "15px", marginTop: "2px" }}
                        icon={faPlus}
                      />
                      {""} Newest
                    </button>
                  </div>
                )}
              </div>
              {/*Search Exclude Include words*/}

              <div className="sortbtnexclude-include sm:block  hidden ">
                <button
                  className="  bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
                  onClick={() => setExIn(!exIn)}
                >
                  Search
                </button>
              </div>

              {/*sm mobile div*/}

              <div
                className=" sm:absolute sm:bottom-[38px] sm:right-0 sm:w-full sm:p-2 sm:flex sm:flex-col bg-[#e2e8f0]"
                style={{ display: !exIn ? "none" : "block" }}
                ref={searchRef}
              >
                {/*sm Include Words */}

                <div className="relative mb-2">
                  <div className="w-full bottom-[51px] shadow h-[35px] rounded pt-1 px-1  bg-white">
                    <input
                      type="text"
                      placeholder="Include Words"
                      className="w-full outline-none bg-white"
                      onChange={(e) => setSortvalue(e.target.value)}
                    />{" "}
                    <span
                      className="cursor-pointer absolute right-5"
                      onClick={() => sortData("include")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        icon={faPlus}
                      />
                    </span>
                  </div>
                </div>
                {/*sm Exclude Words */}
                <div className="relative">
                  <div className="w-full bottom-[51px]   shadow h-[35px] rounded pt-1 px-1 bg-white">
                    <input
                      type="text"
                      placeholder="Exclude Words"
                      className="w-full outline-none bg-white"
                      onChange={(e) => setSortvalue(e.target.value)}
                    />{" "}
                    <span
                      className="cursor-pointer absolute right-5 "
                      onClick={() => sortData("Exclude")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        icon={faPlus}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
              </div>

              {/*sm end*/}

              <div
                className={`sm:hidden  excludewords flex gap-2`}
                ref={includeOutSide}
              >
                <button
                  onClick={includesbtn}
                  className="flex items-center   bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
                >
                  Include Words
                </button>

                <div
                  className="bg-[#060b49]  shadow w-[33%] absolute bottom-[53px] rounded top-[-74px] right-0 p-[12px] left-0 m-auto"
                  style={{ display: !includesToggle ? "none" : "block" }}
                >
                  <div className="include_input  border  rounded pt-1 px-1 shadow bg-white relative ">
                    <input
                      type="text"
                      placeholder="Includes Words"
                      className="w-full outline-none bg-white h-[34px] "
                      onChange={(e) => setSortvalue(e.target.value)}
                    />{" "}
                    <span
                      className="cursor-pointer absolute  right-[10px] top-[10px]"
                      onClick={() => sortData("include")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "16px" }}
                        icon={faPlus}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
                {/*------------*/}
                <div ref={excludesOutside}>
                  <button
                    onClick={Excludesbtn}
                    className=" flex items-center bg-[#060b49] hover:bg-[#2b274c] text-white font-bold py-2 px-4 rounded"
                  >
                    Exclude Words
                  </button>

                  {excludesToggle && (
                    <div className="bg-[#060b49]  shadow w-[33%] absolute bottom-[53px] rounded top-[-74px] right-0 p-[12px] left-0 m-auto">
                      <div className="exclude_input  border  rounded pt-1 px-1 shadow bg-white relative ">
                        <input
                          type="text"
                          placeholder="Excludes Words"
                          className="w-full outline-none bg-white h-[34px] "
                          onChange={(e) => setSortvalue(e.target.value)}
                        />{" "}
                        <span
                          className="cursor-pointer absolute  right-[10px] top-[10px]"
                          onClick={() => sortData("exclude")}
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "16px" }}
                            icon={faPlus}
                          ></FontAwesomeIcon>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
            {/* //pagiantion */}
            <div
              className="pagination bg-[#e2e8f0] dark:bg-light-grey  p-2  flex my-0 bottom-0
            justify-center "
            >
              <ReactPaginate
                className="flex justify-center "
                breakLabel="..."
                nextLabel=" >>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(totalData / 10)}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                pageClassName="bg-[#060b49] hover:bg-[#2b274c] text-white dark:bg-[#636161] dark:text-black mx-1  rounded "
                activeClassName="active   "
              />
            </div>
            {/* pagiantion end */}
          </div>
     </>
    )
}
export default SortBtn;