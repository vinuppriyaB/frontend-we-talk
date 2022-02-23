import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Header from "../component/header/Header";
import "./ChatPage.css";
import ChatAccount from "../component/chatAccount/ChatAccount";
import ChatBox from "../component/chatBox/ChatBox";

import { useContext } from "react";

import { ChatState } from "../Context/chatContext/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  // const { user } = ChatState();

  console.log(ChatState());
  const users = JSON.parse(localStorage.getItem("userInfo"));

  // const getChat = async () => {
  //   const res = await axios.get("http://localhost:5000/api/chat");
  //   setChat(res.data);
  //   console.log(res.data);
  // };
  // useEffect(() => {
  //   getChat();
  // }, []);
  return (
    <div className="ChatPage_container">
      <div className="header_wrapper">
        <Header />
      </div>
      <div className="content_wrapper">
        <div className="chatAccount_wrapper">
          <ChatAccount />
        </div>
        <div className="chatBox_wrapper">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
