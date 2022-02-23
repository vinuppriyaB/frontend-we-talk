import React, { useState, useEffect } from "react";
import "./ChatAccount.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ChatState } from "../../Context/chatContext/ChatProvider";
import axios from "axios";

const ChatAccount = () => {
  const { user, setSelectedChat, chats, setchats, selectedChat } = ChatState();
  const [loggedinUser, setLoggedinUser] = useState();
  const users = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    setLoggedinUser(JSON.parse(localStorage.getItem("userInfo")));

    const fetchChatdata = async () => {
      console.log(users.token);
      const headerdata = {
        headers: {
          token: users.token,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/chat",
          headerdata
        );
        console.log(data);
        if (!chats.find((c) => c._id === data._id)) setchats([data, ...chats]);

        setSelectedChat(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchChatdata();
  }, []);

  console.log(selectedChat);
  return (
    <div>
      <Box
        sx={{
          width: 500,
          height: 500,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Box
          sx={{
            width: "100%",

            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "white",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div className="myAccount">
            <h3>My Account</h3>
            <Button variant="contained">create group</Button>
          </div>
          {selectedChat}
        </Box>
      </Box>
    </div>
  );
};

export default ChatAccount;

// {selectedChat &&
//   selectedChat.map(() => (

//   ))}
// <div className="otherAccount">fvbjdfbv</div>
