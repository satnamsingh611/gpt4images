"use client"
import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FromInput } from './inputsField'
import axios from "axios";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
const SortBtn = ({ handlePageClick, totalData, setSortData, getImg, setSortToggle }) => {

  const [Sorting, setSorting] = useState('')
  const [keywords, setKeywords] = useState('');
  console.log(keywords,"keywords")




  const [exIn, setExIn] = useState(false);

  const handleChange = async (e) => {
    let value = e.target.value;

    switch (value) {
      case 'newest':
      case 'oldest':
        setSorting(value);
        console.log(value, "Date");

        const sortedByDate = [...getImg].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          setSortToggle(true);
          return value === "newest" ? dateA - dateB : dateB - dateA;
        });

        console.log(sortedByDate, "sortedArrayDate");
        setSortData(sortedByDate);
        break;

      case 'least':
      case 'most':
       
        setSorting(value);

        const sortedByLikes = [...getImg].sort((a, b) => {
          setSortToggle(true);
          return value === "least" ? a.Likes - b.Likes : b.Likes - a.Likes;
        });

        console.log(sortedByLikes, "sortedArrayLikes");
        setSortData(sortedByLikes);
        break;

      case 'exclude':
        setSorting('exclude')
        try {
          const response = await axios.get(process.env.REACT_APP_GPT5_IMAGE_OJ + 'exclude/' + `${keywords}`);
          setSortData(response.data);
          setSortToggle(true);
          setSorting('')
          console.log(response.data,"exclude")
        } catch (error) {
          console.log(error.message, "sorting exclude");
        }
        break;

      case 'include':
        setSorting('include')
        try {
          const response = await axios.get(process.env.REACT_APP_GPT5_IMAGE_OJ + 'include/' + `${keywords}`);
          setSortData(response.data);
          setSortToggle(true);
          setSorting('')
           console.log(response.data,"incl")
        } catch (error) {
          console.log(error.message, "sorting include");
        }
        break;

      default:
        break;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(Sorting, "Sorting");
    if (Sorting === 'excludewords') {
      setKeywords('');
      setSortToggle(true);
      handleChange({ target: { value: 'exclude' } });
    } else if (Sorting === 'includewords') {
      setKeywords('');
      setSortToggle(true);
      handleChange({ target: { value: 'include' } });
    
    }
  };


  return (
    <>
      <div className="shortbtn w-[300px]">

        <div className=" sortBtn_sidebar w-[300px]  sm:w-[250px] sm:gap-[6px] fixed gap-[1rem]">
          <h4 className="text-center border-b border-white leading-[40px]">
            <strong className="text-grey  dark:text-white text-white text-center">Sorting Image</strong>{" "}
          </h4>
          <div className="sorting_include_exclude">
          <div className='radio_buttons py-2 text-white'>
                    <input type="radio" name='sorting' value="excludewords" onChange={(e) => setSorting(e.target.value)} />Excludes {''}
                    <input type="radio" name='sorting' value="includewords" onChange={(e) => setSorting(e.target.value)} />Includes
                </div>
            <FromInput
              keywords={keywords}
              setKeywords={setKeywords}
              setSorting={setSorting}
              sorting={Sorting}
              setSortToggle={setSortToggle}
            
              handleSearch={handleSearch}
              
            />
          </div>
          <div className="relative  ">
            <div className="text-white"><span>(1)</span> {''} Sorting with Likes</div>
            <select className="w-[240px] h-[38px] rounded" value={Sorting} onChange={(e) => handleChange(e)}>

              <option>
                Likes
              </option>
              <option value="least">
                {/* <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                /> */}
                {""} Least
              </option>
              <option value="most">

                {/* <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                /> */}
                {""} Most

              </option>
            </select>
          </div>
          {/* // date sorting */}
          <div className="relative">
            <div className="text-white"> <span>(2)</span> Sorting with Date</div>
            <select className="w-[240px] h-[38px] rounded" value={Sorting} onChange={handleChange}>
              <option>
                Date
              </option>
              <option value="newest">
                {/* <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                /> */}
                {""} Newest
              </option>
              <option value="oldest" >

                {/* <FontAwesomeIcon
                  style={{ fontSize: "15px", marginTop: "2px" }}
                  icon={faPlus}
                /> */}
                {""} Oldest

              </option>
            </select>
          </div>



          {/*sm mobile div*/}

          <div
            className=" sm:absolute sm:bottom-[38px] sm:right-0 sm:w-full sm:p-2 sm:flex sm:flex-col bg-[#e2e8f0]"
            style={{ display: !exIn ? "none" : "block" }}

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
            className={`sm:hidden  excludewords`}

          >
         

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
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={Math.ceil(totalData / 10)}
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
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