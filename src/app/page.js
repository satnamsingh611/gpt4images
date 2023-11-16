"use client"
import React from "react"; 
import dynamic from "next/dynamic";
const LoadingComponent = () => <p>Loading...</p>;

const ChatView = dynamic(() => import('../Components/ChatView'), {
  loading: () => <LoadingComponent />,
  ssr: false,
});
// import ChatView from "@/Components/ChatView";
export default function Home(props) {
  

  return (
    <>
      <ChatView {...props} />
    </>
  );
}
