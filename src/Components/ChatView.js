"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
// import ChatMessage from "./ChatMessage";

import dynamic from "next/dynamic";
const ChatMessage = dynamic(() => import("../Components/ChatMessage"));
import { ChatContext } from "./Contex/ChatContext";
import Thinking from "./Thinking";

import { MdSend } from "react-icons/md";
import Filter from "bad-words";
import axios from "axios";
import modelsManager from "./Utils/ModelManagers";

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const options = "OpenJourney";
  // const [selected, setSelected] = useState(options[0]);
  const [messages, addMessage] = useContext(ChatContext);
  const [aiData, setAiData] = useState();

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const postdata = async (data) => {
    if (data.ai === true) {
      setAiData({
        id: data.id,
        text: data.text,
        createdAt: data.createdAt,
        ai: data.ai,
        selected: data.selected,
        value: formValue,
      });
    } else {
      return true;
    }
  };


  // ----no need-----//
  // const postaidata = async (data) => {
  //   try {
  //     let responce = await axios.post(process.env.Get_Images_OJ + `users`, {
  //       id: data.id,
  //       text: data.text,
  //       createdAt: data.createdAt,
  //       ai: data.ai,
  //       value: data.value,
  //       title: data.value,
  //       selected: data.selected,
  //     });
  //     let res = await responce;
  //     console.log("res", res);

  //     return res;
  //   } catch {
  //     return null;
  //   }
  // };

  // shorting like date API

  useEffect(() => {}, []);

  /// like value increase
  // const Saveimage = async () => {
  //   let createdDate = new Date().toLocaleString();

  //   try {
  //     if (!aiData.text) {
  //       alert("data not found from server");
  //     }
  //     if (typeof window !== "undefind") {
  //       let email = window.localStorage.getItem("userData"); //get user email id from localstorage
  //       let UserEmail = JSON.parse(email); // jsonparse
  //       const ImageSaveapi = await axios.post(
  //         process.env.Get_Images_OJ + "saveImages",
  //         {
  //           link_to_image: aiData.text,
  //           creator: UserEmail.email,
  //           keywords: aiData.value,
  //           date: createdDate,
  //           likes: 0,
  //         }
  //       );
  //       console.log("ImageSaveapi", ImageSaveapi);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   var selectedbtn = "";
  //   messages.forEach((items, index) => {
  //     if (items.selected === "OpenJourney" && index >= 1) {
  //       selectedbtn = items.selected;
  //     }
  //   });
  //   if (selectedbtn === "OpenJourney") {
  //     Saveimage();
  //   }

  //   postaidata(aiData);
  // }, [aiData]);

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = async (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      Time: new Date().toLocaleTimeString(),
      text: newValue,
      ai: ai,
      selected: options,
    };

    addMessage(newMsg);

    postdata(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;

    const newMsg = cleanPrompt;
    const aiModel = options;

    setThinking(true);
    setFormValue("");
    updateMessage(newMsg, false, aiModel);

    // handler request and response here
    await modelsManager(aiModel, cleanPrompt, updateMessage, setThinking);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 👇 Get input value
      sendMessage(e);
    }
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //======================================================

  return (
    <div className=" chatview " style={{ height: "calc(100vh - 56px)" }}>
      <main className="chatview__chatarea">
        {messages.map((message, index) => {
          return (
            <ChatMessage
              className="message-text"
              key={index}
              message={{ ...message }}
            />
          );
        })}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </main>
      <form className="form" onSubmit={sendMessage}>
      <p className="OJ_button dark:text-gray-400">OpenJourney</p>

        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            value={formValue}
            aria-label="Search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />

          <button
            type="submit"
            aria-label="chatview__btn-send"
            className="chatview__btn-send"
            disabled={!formValue}
          >
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatView;
