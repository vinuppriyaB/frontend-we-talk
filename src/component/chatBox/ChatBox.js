import React from "react";
import "./ChatBox.css";
import { ChatState } from "../../Context/chatContext/ChatProvider";
import SingleChat from "./SingleChat.js";
import Box from "@mui/material/Box";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = ChatState();

  return (
    <div className="ChatBox_container">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
