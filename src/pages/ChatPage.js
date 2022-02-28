import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Header from "../component/header/Header";
import "./ChatPage.css";
import ChatAccount from "../component/chatAccount/ChatAccount";
import ChatBox from "../component/chatBox/ChatBox";
import { ChatState } from "../Context/chatContext/ChatProvider";
import Box from "@mui/material/Box";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, setSelectedChat, chats, setchats, selectedChat } = ChatState();

  console.log(ChatState());
  console.log(user);
  const users = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="ChatPage_container">
      <div className="header_wrapper">
        <Header />
      </div>
      <div className="content_wrapper">
        <Box
          className="chatAccount_wrapper"
          sx={{
            p: "10px",
            backgroundColor: "black",
            color: "white",
            display: { xs: `${selectedChat ? "none" : "block"}`, sm: "flex" },
          }}
        >
          <ChatAccount fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
        <Box
          className="chatBox_wrapper"
          className="ChatBox_container"
          sx={{
            backgroundColor: "orange",
            display: { xs: `${selectedChat ? "block" : "none"}`, sm: "flex" },
          }}
        >
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
      </div>
    </div>
  );
};

export default ChatPage;
