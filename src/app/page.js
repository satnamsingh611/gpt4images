"use client"
import React,{useState,useEffect} from "react"; 
import ChatView from "@/Components/ChatView";

import Login from "@/Components/Login/Login";
export default function Home(props) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(window.localStorage.getItem('userData'));
        if (!data?.email) {
          setModalOpen(true);
        }
      } catch (e) {
        setModalOpen(true);
        console.log('Check email err: ', e);
      }
    }
  }, []);

  return (
    <>
  
      {modalOpen && <Login modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <ChatView {...props} />
    </>
  );
}
