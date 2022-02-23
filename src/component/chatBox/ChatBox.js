import React from "react";
import "./ChatBox.css";
import { ChatState } from "../../Context/chatContext/ChatProvider";
const ChatBox = () => {
  const { user, setSelectedChat } = ChatState();

  return <div>chatBox</div>;
};

export default ChatBox;
