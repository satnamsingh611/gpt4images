"use client";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SortBtn from "../NewComponents/sortBtn";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRouter } from "next/navigation";
import { ImageContext } from "../Contex/ChatContext";
import { getLocalStroage } from "../lib/windowError";


// import Spinner from "../NewComponents/Spinner";
// const imageModels = ["DALL·E", "OpenJourney"];
const findpage = () => {
  const BaseUrl = process?.env?.REACT_APP_GPT5_IMAGE_OJ;
  const [getImg, setGetImg] = useState([]); // get image data
  const [sortdata, setSortData] = useState([]); /// //all sort data like ,date ,include , exclude
  const [sortToggle, setSortToggle] = useState(false); // toggle for map

  const [totalData, setTotalData] = useState();
  const [paginationNum, setPaginationNum] = useState();

  // const [sortDate, setSortDate] = useState('')
  const [spinner, setSpinner] = useState(false);

  const { userImages, setUserImages } = useContext(ImageContext);


  // ======================states==========================//
console.log(sortdata,"sortdata")

  // =======spinner========//
  useEffect(() => {
    const interval = setInterval(() => {
      setSpinner(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // =======spinner========//
  const navigate = useRouter(); // router
  const GetImageData = async () => {
    //pagintion API here
    try {

      const response = await axios.get(
        `${BaseUrl}pegination?page=${!paginationNum ? 1 : paginationNum}&limit=${10}&userId=${getLocalStroage()}`
      );
      console.log(response?.data?.currentPageData, "ppppppp")
      setTotalData(response?.data?.totalLength);
      setGetImg(response?.data?.currentPageData);
      setUserImages(response?.data?.currentPageData); // Image contex
      setSortToggle(false);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  // pagination number increase handleClick
  const handlePageClick = (e) => {
    setPaginationNum(e.selected + 1);
  };


  //validaton for get image
  const isImageFile = (filename) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    return imageRegex.test(filename);
  };


  // like Image API
  const LikeImage = async (id) => {
   
    try {
      const response = await axios.put(process?.env?.REACT_APP_GPT5_IMAGE_OJ + `likeImages/` + `${id}`, {
        Like_user: getLocalStroage(),
        createdAt: Date.now(),
      });
      GetImageData();
      console.log("liker", response.data)

    } catch (error) {
      navigate.push(`/login`);
      console.log(error.message, "like image")
    }

  };

  /// Go to singleImage page
  const ImageIdGet = (id) => {
    navigate.push(`/find/${id}`);
  };
  // pagination fc
  useEffect(() => {
    GetImageData();

  }, [paginationNum]);

  return (

    <div className="main-find-page pt-[65px] pb-[40px] bg-[#e2e8f0] overflow-auto relative  dark:bg-light-grey ">
      <div className="container max-w-[1280px] m-auto">
        <div className="flex ">
          <div className="sortBtns  w-[300px]  h-screen">
            <SortBtn
              setSortToggle={setSortToggle}
              handlePageClick={handlePageClick}
              totalData={totalData}
              getImg={getImg}
              setSortData={setSortData}
         
              // setSortDate={setSortDate}
              // sortDate={sortDate}
            />
          </div>
          <div className="sm:pb-[83px]  getimg-box flex-wrap flex justify-end gap-[23px]   ">
            {getImg && !sortToggle
              ? getImg?.map((items, index) => {
                if (isImageFile(items.link_to_image)) {
                  return (
                    <div key={index}>
                      <div

                        className="OjImagebox sm:px-[6px] mb-2 relative  p-2  "
                      >
                        <div
                          className=" object-bottom object-cover rounded"
                          onClick={() => ImageIdGet(items.id)}
                        >

                          <LazyLoadImage
                            className=" sm:w-[300px] sm:h-[300px] h-[400px] w-[400px] rounded"
                            alt="Images"
                            effect="blur"
                            src={items.link_to_image}
                          />

                        </div>

                        <div className=" left-[10px] leading-[18px] pt-[10px] absolute bottom-[20px]">
                          <div className="likes_date">
                            <div
                              onClick={() => LikeImage(items.id, index)}
                              className={`inline-block pl-2 ${items?.is_Liked === true ? "imageLiked" : "text-gray-400"
                                }`}
                            >
                              <span
                                className={`sm:pl-3 cursor-pointer text-[20px] `}
                              >
                                {" "}
                                <i className={`fa-solid fa-heart `}></i>
                                {items.Likes == 0 ? "" : items.Likes}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
              : sortdata?.map((items, index) => {
                if (isImageFile(items.link_to_image)) {
                  return (
                    <div key={index}>
                      <div
                        className="OjImagebox sm:px-[6px] mb-2 relative  p-2  "
                      >
                        <div
                          className=" object-bottom object-cover rounded"
                          onClick={() => ImageIdGet(items.id)}
                        >

                          <LazyLoadImage
                            className=" sm:w-[300px] sm:h-[300px] h-[400px] w-[400px] rounded"
                            alt="Images"
                            effect="blur"
                            src={items.link_to_image}
                          />

                        </div>

                        <div className=" left-[10px] leading-[18px] pt-[10px] absolute bottom-[20px]">
                          <div className="likes_date">
                            <div
                              onClick={() => LikeImage(items.id, index)}
                              className={`inline-block pl-2 ${items?.is_Liked === true ? "imageLiked" : "text-gray-400"
                                }`}
                            >
                              <span
                                className={`sm:pl-3 cursor-pointer text-[20px] `}
                              >
                                {" "}
                                <i className={`fa-solid fa-heart `}></i>
                                {items.Likes == 0 ? "" : items.Likes}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>

        </div>
      </div>
    </div>

  );
};

export default findpage;
