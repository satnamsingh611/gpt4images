"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SortBtn from "../NewComponents/sortBtn";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRouter } from "next/navigation";
// import Spinner from "../NewComponents/Spinner";
// const imageModels = ["DALL·E", "OpenJourney"];
const findpage = () => {
  const BaseUrl = process?.env?.Get_Images_OJ;
  const [getImg, setGetImg] = useState([]); // get image data
  const [sortdata, setSortData] = useState([]); /// //all sort data like ,date ,include , exclude
  const [sortToggle, setSortToggle] = useState(false); // toggle for map

  const [totalData, setTotalData] = useState();
  const [paginationNum, setPaginationNum] = useState();

  // const [spinner, setSpinner] = useState(false);
  // ======================states==========================//

  //=======spinner========//
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSpinner(true);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  //=======spinner========//
  const navigate = useRouter(); // router
  const GetImageData = async () => {
    //pagintion API here
    try {
      // const response = await axios.get(process.env.Get_Images_OJ + "getImages");

      let userId = null;
      if (typeof window !== "undefined") {
        let email = window.localStorage.getItem("userData"); //get user email id from localstorage
        let userdata = JSON.parse(email); // jsonparse
        userId = userdata.email;
      }
      const response = await axios.get(
        `${BaseUrl}api/items/?page=${
          typeof paginationNum === "number" ? paginationNum : 1
        }&limit=${10}&user_id=${userId}`
      );
      setTotalData(response?.data?.totalCount);
      setGetImg(response?.data?.data);
      setSortToggle(false);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  // pagination number increase handleClick
  const handlePageClick = (e) => {
    setPaginationNum(e.selected + 1);
  };
  // pagination number increase handleClick end

  //validaton for get image
  const isImageFile = (filename) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    return imageRegex.test(filename);
  };
  //*************** * *************************************************************/

  // like Image API
  const LikeImage = async (id) => {
    if (typeof window !== "undefined") {
      let email = window.localStorage.getItem("userData");
      let userdata = JSON.parse(email);
      let userId = userdata.email;

      const response = await axios.post(process.env.Get_Images_OJ + `like`, {
        userId: userId,
        image_id: id,
        date_time: new Date().toLocaleString(),
      });
      console.log("liker", response.data);
      GetImageData();
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
    <div className="overlay">
      <div className="main-find-page bg-[#e2e8f0] h-[100vh] overflow-auto relative dark:bg-light-grey ">
        <div className="container max-w-[1140px] m-auto">
          <div className="sm:pb-[83px]  getimg-box flex-wrap flex justify-center gap-[23px] pt-[10px] pb-[110px] ">
            {getImg && !sortToggle
              ? getImg?.map((items, index) => {
            
                  if (isImageFile(items.link_to_image)) {
                    return (
                      <div>
                      <div
                        key={index}
                        className="OjImagebox sm:px-[6px] mb-2 relative bg-white p-2 rounded-[15px] "
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

                        <div className=" left-[10px] leading-[18px] pt-[10px]">
                          <div className="likes_date">
                            <p
                              onClick={() => LikeImage(items.id, index)}
                              className={`inline-block pl-2 ${
                                items.is_user_liked > 0 ? "imageLiked" : "text-gray-400"
                              }`}
                            >
                              <span
                                className={`sm:pl-3 cursor-pointer text-[20px] `}
                              >
                                {" "}
                                <i className={`fa-solid fa-heart `}></i>
                                {items.likes}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              : sortdata.map((items, index) => {
                  if (isImageFile(items.link_to_image)) {
                    return (
                      <div
                        key={index}
                        className=" sm:px-[6px] mb-2 relative bg-white p-2 rounded-[15px]"
                      >
                        {isImageFile(items.link_to_image) && (
                          <div
                            className="  object-bottom object-cover rounded "
                            onClick={() => ImageIdGet(items.id)}
                          >
                          
                              <LazyLoadImage
                                className="sm:w-[300px] sm:h-[300px] h-[400px] w-[400px] rounded"
                                alt="Images"
                                effect="blur"
                                src={items.link_to_image}
                              />
                          
                          </div>
                        )}
                        <>
                          <div className="likes_date">
                            <p
                              onClick={() => LikeImage(items.id, index)}
                              className={`inline-block pl-2 ${
                                items.is_user_liked > 0 ? "imageLiked" : "text-gray-400"
                              }`}
                            >
                              <span
                                className={`sm:pl-3 cursor-pointer text-[20px] `}
                              >
                                {" "}
                                <i className={`fa-solid fa-heart `}></i>
                                {items.likes}{" "}
                              </span>
                            </p>
                          </div>
                        </>
                      </div>
                    );
                  }
                })}
          </div>
          <div className="sortBtns">
            <SortBtn
              setSortToggle={setSortToggle}
              handlePageClick={handlePageClick}
              totalData={totalData}
              getImg={getImg}
              setSortData={setSortData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default findpage;
